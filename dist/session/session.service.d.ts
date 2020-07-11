import { ReturnModelType, DocumentType } from '@typegoose/typegoose';
import { Session } from './session.model';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { AUTH_DOMAIN } from './session.types';
import { Types } from 'mongoose';
export declare class SessionService {
    private readonly model;
    private readonly config;
    private readonly jwtService;
    constructor(model: ReturnModelType<typeof Session>, config: ConfigService, jwtService: JwtService);
    findOrCreateSession(sub: Types.ObjectId, domain: AUTH_DOMAIN): Promise<DocumentType<Session>>;
    getSession(sub: Types.ObjectId, domain: AUTH_DOMAIN): Promise<DocumentType<Session>>;
    createSession(sub: Types.ObjectId, domain: AUTH_DOMAIN): Promise<DocumentType<Session>>;
    generateToken(sub: Types.ObjectId, domain: AUTH_DOMAIN): Promise<string>;
    deleteSession(sub: Types.ObjectId, domain: AUTH_DOMAIN): Promise<boolean>;
}
