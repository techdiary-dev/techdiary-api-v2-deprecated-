import { ObjectType, Field } from '@nestjs/graphql';
import { prop, Ref, modelOptions } from '@typegoose/typegoose';
import { Article } from 'src/article/article.type';
import { User } from 'src/users/users.type';

export enum INTERACTION_TYPE {
  LIKE = 'LIKE',
  BOOKMARK = 'BOOKMARK',
}

@ObjectType()
@modelOptions({ schemaOptions: { timestamps: true } })
export class InterAction {
  @prop({ ref: 'Article', autopopulate: true })
  articleId: Ref<Article>;

  @prop({ ref: 'User', autopopulate: true })
  userId: Ref<User>;

  @prop()
  type: INTERACTION_TYPE;

  @Field()
  createdAt?: string;

  @Field()
  updatedAt?: string;
}
