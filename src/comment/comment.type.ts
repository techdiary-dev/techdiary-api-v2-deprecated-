import { Types } from 'mongoose';
import { Ref, prop, modelOptions, plugin, pre } from '@typegoose/typegoose';
import { User } from 'src/users/users.type';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Article } from 'src/article/article.type';
import * as mongoosePopulate from 'mongoose-autopopulate';

@modelOptions({
  schemaOptions: {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
})
@plugin(mongoosePopulate as any)
@ObjectType()
export class Comment {
  @Field(() => ID)
  _id: Types.ObjectId;

  @Field()
  @prop()
  body: string;

  @Field(() => User)
  @prop({ ref: () => User, autopopulate: true })
  author: Ref<User>;

  @Field(() => ID, { nullable: true })
  @prop({ ref: () => Comment })
  parent?: Ref<Comment>;

  @Field(() => ID)
  @prop({ ref: () => Article })
  article: Ref<Article>;

  @Field(() => [Comment], { nullable: true })
  @prop({
    ref: () => Comment,
    localField: '_id',
    foreignField: 'parent',
    autopopulate: true,
  })
  comments?: Ref<Comment>[];

  @Field()
  createdAt?: string;

  @Field()
  updatedAt?: string;
}
