import { CustomError } from '../errors/CustomError';

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
