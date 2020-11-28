import nodemailer from 'nodemailer';
import config from '../config';

export const createTransport = (refreshToken: string, email: string) => {
    return nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            type: 'OAuth2',
            user: email,
            clientId: config.gauth.clientID,
            clientSecret: config.gauth.clientSecret,
            refreshToken: refreshToken,
        },
    });
};
