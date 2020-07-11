import { Request } from 'express';
import { Types } from 'mongoose';
export declare enum AUTH_DOMAIN {
    ADMIN = "ADMIN",
    USER = "USER"
}
export interface JWTPayload {
    iss: string;
    sub: Types.ObjectId;
    domain: AUTH_DOMAIN;
}
export interface SessionRequest extends Request {
    user: JWTPayload;
}
