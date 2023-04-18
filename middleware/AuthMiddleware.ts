import asyncHandler from 'express-async-handler';
import { type NextFunction, type Response, type Request } from 'express';

import User from '../models/UserModel';
import { verifyToken } from '../services/TokenService';
import { getUserByID } from '../services/UserService';
import type IUser from '../types/UserTypes';
import HttpException from './ErrorMiddleware';
import { type IUserReturnType } from '../types/UserTypes';

export interface GetUserAuthInfoRequest extends Request {
    user?: IUser;
}

export interface AuthorizedUserRequest extends Request {
    user?: IUserReturnType;
}

export const protect = asyncHandler(
    async (req: GetUserAuthInfoRequest, res: Response, next: NextFunction) => {
        // expect {headers: {authorization: "Bearer token"}}
        if (
            req.headers.authorization === null ||
            req.headers.authorization === '' ||
            req.headers.authorization === undefined ||
            !req.headers.authorization.startsWith('Bearer ')
        ) {
            throw new HttpException('Unauthorized', 401);
        }

        const token = req.headers.authorization.split(' ')[1];
        const decoded = verifyToken(token);
        req.user = await getUserByID(decoded._id, User);
        next();
    }
);
