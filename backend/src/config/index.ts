import dotenv from 'dotenv';

const configLoading = dotenv.config({ path: `${__dirname}/../../.env` });

if (process.env.NODE_ENV !== 'production' && configLoading.error) {
    // This error should crash whole process
    throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

export default {
    environment: process.env.NODE_ENV || 'production',
    port: parseInt(process.env.PORT, 10),
    databaseURI: process.env.MONGODB_URI,
    apiPrefix: process.env.API_PREFIX,
    gauth: {
        clientID: process.env.GAUTH_CLIENT_ID,
        clientSecret: process.env.GAUTH_CLIENT_SECRET,
        callbackURL: process.env.GAUTH_CALLBACK_URL,
    },
    sessionSecret: process.env.SESSION_SECRET,
};
