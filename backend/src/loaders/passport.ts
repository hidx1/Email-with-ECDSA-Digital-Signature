import { Strategy as GoogleOAuthStrategy } from 'passport-google-oauth20';
import { PassportStatic } from 'passport';
import Container from 'typedi';
import { Document, Model } from 'mongoose';
import { Logger } from './logger';
import mongoose from 'mongoose';

interface PassportConfig {
    passport: PassportStatic;
    clientID: string;
    clientSecret: string;
    callbackURL: string;
}

const enablePassport = ({ passport, clientID, clientSecret, callbackURL }: PassportConfig) => {
    const userModel: Model<Document> = Container.get('userModel');
    const logger: Logger = Container.get('logger');

    passport.use(
        new GoogleOAuthStrategy(
            {
                clientID,
                clientSecret,
                callbackURL,
            },
            async (accessToken, refreshToken, profile, callback) => {
                const { id, emails } = profile;

                try {
                    let existingUser = (await userModel.findOne({
                        googleID: id,
                    })) as any;

                    existingUser.refreshToken = refreshToken;
                    await existingUser.save();

                    if (existingUser) {
                        return callback(null, existingUser);
                    }

                    const newUser = new userModel({ email: emails[0].value, googleID: id, accessToken, refreshToken });
                    await newUser.save();
                    callback(null, newUser);
                } catch (error) {
                    logger.error(error, {}, '[Passport][GoogleOAuth2Strategy]: Failed to create new user.');
                    callback(error);
                }
            },
        ),
    );

    passport.serializeUser((user: Document, done) => {
        done(null, user._id);
    });

    passport.deserializeUser(async (_id: string, done) => {
        try {
            let user = await userModel.findById(mongoose.Types.ObjectId(_id));
            done(null, user);
        } catch (error) {
            done(error);
        }
    });
};

export default enablePassport;
