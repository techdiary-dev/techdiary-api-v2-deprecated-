import { AUTH_DOMAIN } from './session.types';
import { Types } from 'mongoose';
export declare class Session {
    sub: Types.ObjectId;
    domain: AUTH_DOMAIN;
    token: string;
}
