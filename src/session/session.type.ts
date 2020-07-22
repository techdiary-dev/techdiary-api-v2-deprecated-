import { Request } from 'express';
import { registerEnumType } from '@nestjs/graphql';
import { Types } from 'mongoose';
import { prop, ModelOptions } from '@typegoose/typegoose';
import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
@ModelOptions({ schemaOptions: { timestamps: true } })
export class Session {
  @Field(() => ID)
  @prop({ required: true })
  sub: Types.ObjectId;

  @Field()
  @prop({ required: true })
  domain: AUTH_DOMAIN;

  @Field()
  @prop({ required: true })
  token: string;

  @Field()
  username: string;

  @Field()
  createdAt?: string;

  @Field()
  updatedAt?: string;
}

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
