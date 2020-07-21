import { prop, ModelOptions } from '@typegoose/typegoose';
import { AUTH_DOMAIN } from './session.types';
import { Types } from 'mongoose';
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
  username: string

  @Field()
  createdAt?: string;

  @Field()
  updatedAt?: string;
}
