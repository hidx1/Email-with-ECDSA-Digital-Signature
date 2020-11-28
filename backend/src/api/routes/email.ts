import { Router } from 'express';
import Container from 'typedi';
import { Logger } from '../../loaders/logger';
import EmailService from '../../services/email';
import { ResponseCreator } from '../../utils/utils';
import { isAuthenticated } from '../middleware/auth';

export default (app: Router) => {
    const route = Router();
    let logger: Logger = Container.get('logger');
    let emailService = Container.get(EmailService);

    route.get('/', isAuthenticated, async (req, res) => {
        try {
            const user = req.user as any;
            const refreshToken = user.refreshToken;

            const type = req.query.type as string;

            let emails = await emailService.GetEmails(refreshToken, type.toUpperCase());

            const { response, status } = ResponseCreator(emails);
            res.status(status).send(response);
        } catch (error) {
            logger.error(error, {}, 'Failed getting emails');
            res.status(500).send(error);
        }
    });

    route.post('/', isAuthenticated, async (req, res, next) => {
        try {
            const { encrypt, signature } = req.query;
            const { emailText, key, destination, subject } = req.body;

            let result = await emailService.SendEmail(
                req.user,
                subject,
                emailText,
                key,
                destination,
                encrypt === 'true',
                signature === 'true',
            );
            const { response, status } = ResponseCreator(result);
            res.status(status).send(response);
        } catch (error) {
            logger.error(error, {}, 'Failed to send email');
            next(error);
        }
    });

    app.use('/email', route);
};
