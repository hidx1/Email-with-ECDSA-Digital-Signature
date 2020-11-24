import { Router } from 'express';
import passport from 'passport';

export default (app: Router) => {
    const route = Router();

    route.get(
        '/authorization_url',
        passport.authorize('google', {
            scope: [
                'https://www.googleapis.com/auth/userinfo.profile',
                'https://www.googleapis.com/auth/userinfo.email',
                'https://mail.google.com/',
            ],
            accessType: 'offline',
            prompt: 'consent',
        }),
    );

    route.get('/callback', passport.authenticate('google'), (req, res) => {
        res.send('OAuth Mechanism Done Successfully');
    });

    app.use('/gauth', route);
};
