import { CustomError } from '../errors/CustomError';
import { Logger } from '../loaders/logger';

export const ResponseCreator = (payload = null, err = null, status = 200) => {
    if (err) {
        if (err instanceof CustomError) {
            let { status, payload, message } = err.toResponse();
            return { status, response: { payload, message } };
        }

        return {
            status: 500,
            response: { payload: null, message: 'Internal server error occured! Sorry for the inconvenience!' },
        };
    }

    return {
        status: status,
        response: { payload, message: '' },
    };
};

export const createExceptionHandler = (logger: Logger, options = { coredump: false, timeout: 500 }) => {
    return (code: number, reason: string) => (err: Error, promise: Promise<unknown>) => {
        const exitFunction = () => {
            options.coredump ? process.abort() : process.exit(code);
        };

        if (err) {
            logger.error(err, { promise }, reason);
        }

        setTimeout(exitFunction, options.timeout).unref();
    };
};
