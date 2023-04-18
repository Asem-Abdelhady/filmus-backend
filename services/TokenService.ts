import JWT, { type JwtPayload } from 'jsonwebtoken';
import HttpException from '../middleware/ErrorMiddleware';
import { JWT_SECRET } from '../utils/config';

interface UserPayload extends JwtPayload {
    _id: string;
    username: string;
    email: string;
    isAdmin: boolean;
}

export function generateToken(user: UserPayload): string {
    return JWT.sign(user, JWT_SECRET, {
        expiresIn: '20d',
    });
}

export function verifyToken(token: string): UserPayload {
    try {
        return JWT.verify(token, JWT_SECRET) as UserPayload;
    } catch (error) {
        throw new HttpException('Invalid token', 401);
    }
}
