import { Request } from 'express';
import { registerEnumType } from '@nestjs/graphql';
import { Types } from 'mongoose';

export enum AUTH_DOMAIN {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

registerEnumType(AUTH_DOMAIN, {
  name: 'AUTH_DOMAIN',
});

// TODO: exp
export interface JWTPayload {
  iss: string;
  sub: Types.ObjectId;
  domain: AUTH_DOMAIN;
}

export interface SessionRequest extends Request {
  user: JWTPayload;
}
