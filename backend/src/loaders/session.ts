import { Application } from 'express';
import MongoStoreModule from 'connect-mongo';
import session from 'express-session';
import { v4 as uuidv4 } from 'uuid';
import mongoose from 'mongoose';
import config from '../config';

const configureSession = (app: Application, mongooseConnection: mongoose.Connection) => {
    const MongoStore = MongoStoreModule(session);

    app.use(
        session({
            genid: () => uuidv4(),
            store: new MongoStore({ mongooseConnection }),
            secret: config.sessionSecret,
            resave: false,
            saveUninitialized: false,
            proxy: process.env.NODE_ENV === 'production' ? true : false,
            cookie: {
                path: '/',
                secure: false,
                httpOnly: false,
                sameSite: 'none',
                maxAge: 2 * 24 * 3600 * 1000, // 2days
            },
        }),
    );
};

export default configureSession;
