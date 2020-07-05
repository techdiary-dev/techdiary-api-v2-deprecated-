import { Request } from 'express';
import { registerEnumType } from '@nestjs/graphql';

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
  sub: string;
  domain: AUTH_DOMAIN;
}

export interface SessionRequest extends Request {
  user: JWTPayload;
}
