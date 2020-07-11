import { prop, modelOptions, plugin } from '@typegoose/typegoose';
import { ObjectType, Field, InputType, ID } from '@nestjs/graphql';
import { ArticlePayload } from 'src/article/article.input';
import * as mongoosePopulate from 'mongoose-autopopulate';
import { Types } from 'mongoose';

@ObjectType('LinkType')
@InputType('LinkInput')
export class Link {
  @prop()
  @Field()
  public text: string;

  @prop()
  @Field()
  public link: string;
}

@ObjectType('WorkInfo')
@InputType('WorkInfoInput')
export class WorkInfo {
  @prop()
  @Field()
  public name: string;

  @prop()
  @Field()
  public designation: string;

  @prop()
  @Field()
  public startTime: string;

  @prop()
  @Field()
  public endTime: string;
}

@ObjectType()
@plugin(mongoosePopulate as any)
export class User {
  @Field(() => ID)
  public _id: Types.ObjectId;

  @Field()
  @prop({ required: true })
  public name: string;

  @Field()
  @prop({ lowercase: true, unique: true, required: true })
  public username: string;

  @Field({ nullable: true })
  @prop({ unique: true })
  public email?: string;

  @Field({ nullable: true })
  @prop()
  public profilePhoto?: string;

  @Field()
  @prop({ required: true })
  public githubUID: string;

  @Field({ nullable: true })
  @prop()
  public education?: string;

  @Field({ nullable: true })
  @prop()
  public designation?: string;

  @Field({ nullable: true })
  @prop()
  public location?: string;

  @Field({ nullable: true })
  @prop()
  public bio?: string;

  @Field(() => [Link], { nullable: true })
  @prop({ type: Link, _id: false })
  public links?: Link[];

  @Field(() => [WorkInfo], { nullable: true })
  @prop({ type: WorkInfo, _id: false })
  workInfo?: WorkInfo[];

  @Field(() => [String], { nullable: true })
  @prop({ type: String })
  public skills?: string[];

  @Field(() => ArticlePayload, { nullable: true })
  articles?: ArticlePayload;
}
