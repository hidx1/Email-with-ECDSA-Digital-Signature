import { NextFunction, Request, Response } from 'express';
import { NotAuthenticatedError } from '../../errors/ClientErrors';

export const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
    if (!req.isAuthenticated()) {
        next(new NotAuthenticatedError());
    }

    next();
};
