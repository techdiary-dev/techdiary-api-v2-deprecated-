import {
  InputType,
  Field,
  ID,
  ObjectType,
  Int,
  ArgsType,
} from '@nestjs/graphql';
import { Article } from './article.type';
import { IsNotEmpty, MinLength, IsDefined } from 'class-validator';
import { Types } from 'mongoose';

@InputType()
export class idOrSlugArg {
  @Field(() => ID, { nullable: true })
  _id?: Types.ObjectId;

  @Field({ nullable: true })
  slug?: string;
}

@ObjectType()
export class ArticlePayload {
  @Field(() => Int)
  resourceCount: number;

  @Field(() => Int)
  pageCount: number;

  @Field(() => Int)
  currentPage: number;

  @Field(() => [Article])
  data: Article[];
}

@InputType()
export class CreateArticleInput {
  @Field({ nullable: true })
  @IsNotEmpty({ message: 'টাইটেল দিতেই হবে' })
  @MinLength(10, { message: 'টাইটেল এ কমপক্ষে ১০ টি অক্ষর থাকতে হবে' })
  title: string;

  @Field({ nullable: true })
  @MinLength(100, { message: 'ডায়েরিতে এ কমপক্ষে ১০০ টি অক্ষর থাকতে হবে' })
  body: string;

  @Field()
  isPublished: boolean;

  @Field({ nullable: true })
  thumbnail?: string;

  @Field(() => [String], { nullable: true })
  @IsDefined({ message: 'কমপক্ষে একটি ট্যাগ দিতেই হবে' })
  @IsNotEmpty({ message: 'কমপক্ষে একটি ট্যাগ দিতেই হবে' })
  tags?: string[];

  @Field(() => String, { nullable: true })
  seriesName?: string;
}

@InputType()
export class updateArticleInput {
  @Field({ nullable: true })
  @IsNotEmpty({ message: 'টাইটেল দিতেই হবে' })
  @MinLength(10, { message: 'টাইটেল এ কমপক্ষে ১০ টি অক্ষর থাকতে হবে' })
  title?: string;

  @Field({ nullable: true })
  @MinLength(100, { message: 'ডায়েরিতে এ কমপক্ষে ১০০ টি অক্ষর থাকতে হবে' })
  body?: string;

  @Field(() => [String], { nullable: true })
  @IsDefined({ message: 'কমপক্ষে একটি ট্যাগ দিতেই হবে' })
  @IsNotEmpty({ message: 'কমপক্ষে একটি ট্যাগ দিতেই হবে' })
  tags?: string[];

  @Field({ nullable: true })
  thumbnail?: string;

  @Field({ nullable: true })
  isPublished?: boolean;

  @Field(() => String, { nullable: true })
  seriesName?: string;
}

@ArgsType()
export class updateArticleArgs {
  @Field(() => updateArticleInput, { nullable: true })
  data?: updateArticleInput;

  @Field(() => ID)
  _id: string;
}
