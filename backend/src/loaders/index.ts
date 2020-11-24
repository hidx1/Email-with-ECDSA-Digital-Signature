import expressLoader from './express';
import dependencyInjectorLoader from './dependencyInjector';
import mongooseLoader from './mongoose';
import Logger from './logger';
import Models from '../models';

export default async ({ expressApp }) => {
    let mongooseConnection = await mongooseLoader();
    Logger.info('✌️ DB loaded and connected!');

    await dependencyInjectorLoader({
        models: Models,
    });
    Logger.info('✌️ Dependency Injector loaded');

    await expressLoader({ app: expressApp, mongooseConnection });
    Logger.info('✌️ Express loaded');
};
