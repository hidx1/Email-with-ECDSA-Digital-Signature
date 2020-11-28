import { CustomError } from './CustomError';

const BAD_REQUEST_STATUS = 400;
const NOT_AUTHENTICATED_STATUS = 401;

const NOT_AUTHENTICATED_MSG = 'You are not authenticated. Please login!';

export class ClientErrors extends CustomError {
    private status: number;

    constructor(message, context: any, status = BAD_REQUEST_STATUS) {
        super(message, context);
        this.status = status;
        Error.captureStackTrace(this, ClientErrors);
    }

    // For client errors, we tell client what's wrong
    toResponse() {
        return {
            status: this.status,
            payload: null,
            message: this.message,
        };
    }
}

export class NotAuthenticatedError extends ClientErrors {
    constructor(message = NOT_AUTHENTICATED_MSG) {
        super(message, {}, NOT_AUTHENTICATED_STATUS);
        Error.captureStackTrace(this, NotAuthenticatedError);
    }
}
