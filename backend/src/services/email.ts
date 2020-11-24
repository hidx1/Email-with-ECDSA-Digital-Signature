import { Service, Inject } from 'typedi';
import { Logger } from '../loaders/logger';
import { gmail_v1, google } from 'googleapis';
import config from '../config';

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

    public async GetEmails(refreshToken: string): Promise<Email[]> {
        try {
            let auth = new google.auth.OAuth2({
                clientId: config.gauth.clientID,
                clientSecret: config.gauth.clientSecret,
            });
            auth.setCredentials({ refresh_token: refreshToken });
            let gmail = google.gmail({ version: 'v1', auth });
            let response = await gmail.users.messages.list({ userId: 'me', maxResults: 10 });
            let messageIDs = response.data.messages.map(message => message.id);
            let emails = await Promise.all(
                messageIDs.map(messageID => gmail.users.messages.get({ userId: 'me', id: messageID })),
            );
            let emailsData = emails.map(email => this.ProcessEmail(email.data));
            emailsData = emailsData.filter(emailData => emailData !== null);
            return emailsData;
        } catch (error) {
            this.logger.error(error, { ...this.context, method: 'GetEmails' }, 'Error line handle multiple events');
            throw error;
        }
    }

    public ProcessEmail(email: gmail_v1.Schema$Message): Email | null {
        if (email.payload.body.size === 0) {
            return null;
        }
        let sender = email.payload.headers.filter(header => header.name === 'From')[0].value;
        let subject = email.payload.headers.filter(header => header.name === 'Subject')[0].value;
        let date = email.payload.headers.filter(header => header.name === 'Date')[0].value;
        let base64body = email.payload.body.data;
        let decodedBody = Buffer.from(base64body, 'base64').toString();
        let result: Email = { sender, subject, date, body: decodedBody };
        return result;
    }
}
