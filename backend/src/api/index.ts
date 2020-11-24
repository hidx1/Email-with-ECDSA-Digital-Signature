import { Router } from 'express';
import gauth from './routes/googleoauth';
import email from './routes/email';

export default () => {
    const app = Router();
    gauth(app);
    email(app);

    return app;
};
