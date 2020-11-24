import mongoose, { Connection, Mongoose } from 'mongoose';
import config from '../config';
import Logger from './logger';

export default async (): Promise<Connection> => {
    try {
        let connection: Mongoose = await mongoose.connect(config.databaseURI, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 3500,
            poolSize: 10,
        });

        return connection.connection;
    } catch (error) {
        Logger.error(error, '[MongooseLoader]: Failed to connect to database.');
        process.exit(1);
    }
};
