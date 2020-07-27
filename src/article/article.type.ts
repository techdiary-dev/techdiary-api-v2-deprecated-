import { ObjectType, Field, ID, Int } from '@nestjs/graphql';
import { ObjectId } from 'mongodb';
import {
  prop,
  modelOptions,
  plugin,
  pre,
  Ref,
  getName,
} from '@typegoose/typegoose';
import { User } from 'src/users/users.type';
import * as mongoosePopulate from 'mongoose-autopopulate';
import { slugify } from 'src/utils/slugify';

@ObjectType()
@modelOptions({
  schemaOptions: {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
})
@plugin(mongoosePopulate as any)
@pre<Article>('save', function(next) {
  this.slug = slugify(this.title, true);
  next();
})
export class Article {
  @Field(() => ID)
  _id?: ObjectId;

  @Field()
  @prop()
  title: string;

  @Field()
  @prop()
  slug?: string;

  @Field()
  excerpt?: string;

  @Field()
  @prop()
  body: string;

  @Field()
  @prop()
  isPublished: boolean;

  @Field({ nullable: true })
  @prop({ default: false })
  isPinned?: boolean;

  @Field({ nullable: true })
  @prop({ default: false })
  isFeatured?: boolean;

  @Field({ nullable: true })
  @prop()
  thumbnail?: string;

  @Field(() => [String], { nullable: true })
  @prop({ type: String })
  tags?: string[];

  @Field(() => User, { nullable: true })
  @prop({ ref: () => getName(User), autopopulate: true })
  author?: Ref<User>;

  @Field()
  createdAt?: string;

  @Field()
  updatedAt?: string;

  @Field({ nullable: true })
  @prop()
  seriesName?: string;

  @Field(() => [Article], { nullable: true })
  series?: Article[];

  @Field()
  url?: string;

  @Field(() => Int)
  timeToRead?: number;
}
