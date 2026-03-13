import dotenv from 'dotenv';
dotenv.config();
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET!;
const EXPIRES_IN = '3h'; 

export const signToken = (payload: object): string => {
    
    return jwt.sign(payload, JWT_SECRET, {
        expiresIn: EXPIRES_IN,
        algorithm: 'HS512',
    });
};

export const verifyToken = (token: string): any => {
    return jwt.verify(token, JWT_SECRET);
};