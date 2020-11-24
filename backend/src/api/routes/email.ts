import { Router } from 'express';
import Container from 'typedi';
import { Logger } from '../../loaders/logger';
import EmailService from '../../services/email';

export default (app: Router) => {
    const route = Router();
    let logger: Logger = Container.get('logger');
    let emailService = Container.get(EmailService);

    route.get('/', async (req, res) => {
        try {
            const user: any = req.user;
            const refreshToken = user.refreshToken;

            let emails = await emailService.GetEmails(refreshToken);
            res.send(emails);
        } catch (error) {
            logger.error(error, {}, 'Failed getting emails');
            res.status(500).send(error);
        }
    });

    app.use('/email', route);
};
