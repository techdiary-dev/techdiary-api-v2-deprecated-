import { InputType, Field, ID, PartialType } from '@nestjs/graphql';
import { Types } from 'mongoose';
import { IsNotEmpty } from 'class-validator';
@InputType()
export class CreateCommentInput {
  @Field()
  @IsNotEmpty({ message: "body can't be empty" })
  body: string;

  @Field(() => ID, { nullable: true })
  parent?: Types.ObjectId;

  @Field(() => ID, { nullable: true })
  @IsNotEmpty({ message: 'An articleId is required.' })
  article: Types.ObjectId;
}

@InputType()
export class UpdateCommentInput extends PartialType(CreateCommentInput) {}
