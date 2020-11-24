import { Application, Request } from 'express';
import cors from 'cors';
import routes from '../api';
import config from '../config';
import logger from './logger';
import configurePassport from './passport';
import configureSession from './session';
import passport from 'passport';
import { Connection } from 'mongoose';

export default ({ app, mongooseConnection }: { app: Application; mongooseConnection: Connection }) => {
    logger.setupLoggingMiddleware(app);

    app.enable('trust proxy');

    app.use(cors());

    app.get('/status', (req, res) => {
        res.status(200).end();
    });

    configurePassport({
        passport,
        clientID: config.gauth.clientID,
        clientSecret: config.gauth.clientSecret,
        callbackURL: config.gauth.callbackURL,
    });
    configureSession(app, mongooseConnection);

    app.use(passport.initialize());
    app.use(passport.session());

    // Load API routes
    app.use(config.apiPrefix, routes());

    /// catch 404 and forward to error handler
    app.use((req, res) => {
        res.sendStatus(404);
    });

    // eslint-disable-next-line
    app.use((err, req:Request, res, next) => {
        logger.error(err, { location: 'ExpressErrorHandler' }, 'Unexpected Error');
        res.status(500).send({
            payload: null,
            message: 'Unexpected error happened!',
        });
    });
};
