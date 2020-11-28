import { Service, Inject } from 'typedi';
import { Logger } from '../loaders/logger';
import { gmail_v1, google } from 'googleapis';
import config from '../config';
import { PythonShell } from 'python-shell';
import { createTransport } from '../loaders/nodemailer';

interface Email {
    sender: string;
    subject: string;
    date: string;
    body: string;
}

@Service()
export default class EmailService {
    constructor(@Inject('logger') private logger: Logger) {}

    context = { location: 'EmailService' };

    public async GetEmails(refreshToken: string, type: string): Promise<Email[]> {
        try {
            let auth = new google.auth.OAuth2({
                clientId: config.gauth.clientID,
                clientSecret: config.gauth.clientSecret,
            });
            auth.setCredentials({ refresh_token: refreshToken });
            let gmail = google.gmail({ version: 'v1', auth });
            let response = await gmail.users.messages.list({ userId: 'me', maxResults: 10, labelIds: [type] });

            let messageIDs = response.data.messages.map(message => message.id);
            let emails = await Promise.all(
                messageIDs.map(messageID => gmail.users.messages.get({ userId: 'me', id: messageID, format: 'FULL' })),
            );

            let emailsData = await Promise.all(emails.map(email => this.ProcessEmail(email.data)));
            emailsData = emailsData.filter(emailData => emailData !== null);
            return emailsData;
        } catch (error) {
            this.logger.error(error, { ...this.context, method: 'GetEmails' }, 'Error get emails');
            throw error;
        }
    }

    public async ProcessEmail(email: gmail_v1.Schema$Message): Promise<Email | null> {
        let { text } = this.ParseMessagePart(email.payload);
        if (text.length === 0) {
            return null;
        }

        let body = text.join('\n');

        let { headers } = email.payload;
        let sender = this.ExtractHeader(headers, 'From');
        let subject = this.ExtractHeader(headers, 'Subject');
        let date = this.ExtractHeader(headers, 'Date');

        let result: Email = { sender, subject, date, body };
        return result;
    }

    private ParseMessagePart(messagePart: gmail_v1.Schema$MessagePart) {
        let result = { text: [], attachment: [] };
        if (messagePart.mimeType.startsWith('multipart')) {
            let results = messagePart.parts.map(part => this.ParseMessagePart(part));
            results.forEach(recursiveResult => {
                result.text.push(...recursiveResult.text);
                result.attachment.push(...recursiveResult.attachment);
            });
            return result;
        }

        if (messagePart.mimeType === 'text/plain') {
            let decoded = this.DecodeBase64(messagePart.body.data);
            result.text.push(decoded);
        }

        // Has attachment
        // if (messagePart.mimeType.startsWith('application')) {
        //     result.attachment.push(messagePart.body.attachmentId);
        // }
        return result;
    }

    private DecodeBase64(encodedString: string): string {
        let decoded = Buffer.from(encodedString, 'base64').toString();
        return decoded;
    }

    private ExtractHeader(headers: gmail_v1.Schema$MessagePartHeader[], name: string): string {
        let header = headers.filter(header => header.name === name);
        if (header.length === 0) {
            return null;
        }
        return header[0].value;
    }

    public async SendEmail(
        user: any,
        subject: string,
        plaintext: string,
        key: string,
        destination: string,
        encrypt: boolean,
        signature: boolean,
    ): Promise<void> {
        return new Promise(async (resolve, reject) => {
            try {
                const { email: userEmail, refreshToken } = user;

                let emailBody = plaintext;
                if (encrypt) {
                    emailBody = await this.EncryptText(plaintext, key);
                }

                let transport = createTransport(refreshToken, userEmail);

                let email = { from: userEmail, to: destination, subject, text: emailBody };
                transport.sendMail(email, (err, info) => {
                    if (err) {
                        this.logger.error(err, 'Failed to send email');
                        throw err;
                    }
                    this.logger.info(info, 'Mail sent succesfully');
                    resolve();
                });
            } catch (error) {
                this.logger.error(error, { ...this.context, method: 'GetEmails' }, 'Error send email');
                reject(error);
            }
        });
    }

    public async EncryptText(plaintext: string, key: string): Promise<string> {
        return new Promise((resolve, reject) => {
            PythonShell.run(
                `${__dirname}/../../cipher/blockCipher.py`,
                { args: [plaintext, key, 'true'] },
                (err, result) => {
                    if (err) {
                        return reject(err);
                    }
                    return resolve(result[0]);
                },
            );
        });
    }

    public async CreateMail(from: string, to: string, subject: string, text: string) {
        return {
            from,
            to,
            subject,
            text,
        };
    }
}
