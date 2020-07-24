import { ObjectType, Field, ID } from '@nestjs/graphql';
import { prop, Ref, modelOptions, plugin } from '@typegoose/typegoose';
import * as mongoosePopulate from 'mongoose-autopopulate';
import { User } from 'src/users/users.type';
import { Types } from 'mongoose';
import { Article } from 'src/article/article.type';

export enum INTERACTION_TYPE {
  LIKE = 'LIKE',
  BOOKMARK = 'BOOKMARK',
}

export enum INTERACTION_RESOURCE {
  ARTICLE = 'ARTICLE',
}

@plugin(mongoosePopulate as any)
@ObjectType()
@modelOptions({ schemaOptions: { timestamps: true } })
export class InterAction {
  @Field(() => ID)
  _id?: Types.ObjectId;

  @Field(() => User)
  @prop({ ref: 'User', autopopulate: true })
  user: Ref<User>;

  @Field()
  @prop()
  resource: INTERACTION_RESOURCE;

  @Field(() => ID)
  @prop()
  resourceId: Types.ObjectId;

  @Field()
  @prop()
  type: INTERACTION_TYPE;

  @Field()
  createdAt?: string;

  @Field()
  updatedAt?: string;
}
