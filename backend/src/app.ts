import 'reflect-metadata'; // We need this in order to use @Decorators
import config from './config';
import express from 'express';
import logger from './loaders/logger';
import loader from './loaders';
import { createExceptionHandler } from './utils/utils';

async function startServer() {
    const app = express();

    await loader({ expressApp: app });

    app.listen(config.port, () => {
        logger.info(`
        ################################################
        🛡️  Server listening on port: ${config.port} 🛡️
        ################################################
        `);
    });

    const exceptionHandler = createExceptionHandler(logger);

    process.on('uncaughtException', exceptionHandler(1, 'Uncaught Exception'));
    process.on('unhandledRejection', exceptionHandler(1, 'Unhandled Rejection'));
    process.on('SIGTERM', exceptionHandler(0, 'SIGTERM'));
    process.on('SIGINT', exceptionHandler(0, 'SIGINT'));
}

try {
    startServer().catch(err => {
        throw err;
    });
} catch (error) {
    logger.error(error, 'Initialization error');
}
