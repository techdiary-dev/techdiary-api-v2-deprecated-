import { prop } from '@typegoose/typegoose';
import { ObjectType, Field } from '@nestjs/graphql';
import { ArticlePayload } from 'src/article/article.input';

@ObjectType()
export class Link {
  @prop()
  @Field()
  public text: string;

  @prop()
  @Field()
  public url: string;
}

@ObjectType()
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
export class User {
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
  @prop({ type: Link })
  public links?: Link[];

  @Field(() => [String], { nullable: true })
  @prop()
  public skills?: string[];

  @Field(() => ArticlePayload, { nullable: true })
  articles?: ArticlePayload;
}
