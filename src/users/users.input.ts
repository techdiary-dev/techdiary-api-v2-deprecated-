import {
  InputType,
  Field,
  Int,
  ObjectType,
  ArgsType,
  ID,
} from '@nestjs/graphql';
import { Link, WorkInfo, User } from './users.type';
import { Types } from 'mongoose';

// @InputType()
// export class LinksInput {
//   @Field({ nullable: true })
//   text?: string;

//   @Field({ nullable: true })
//   link?: string;
// }

// @InputType()
// export class WorkInfoInput {
//   @Field()
//   name: string;

//   @Field()
//   designation: string;

//   @Field()
//   startTime: string;

//   @Field({ nullable: true })
//   endTime?: string;
// }

@InputType()
export class UpdateUserInput {
  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  username?: string;

  @Field({ nullable: true })
  email?: string;

  @Field({ nullable: true })
  profilePhoto?: string;

  @Field({ nullable: true })
  education?: string;

  @Field({ nullable: true })
  designation?: string;

  @Field({ nullable: true })
  location?: string;

  @Field({ nullable: true })
  bio?: string;

  @Field(() => [Link], { nullable: true })
  links?: Link[];

  @Field(() => [String], { nullable: true })
  skills?: string[];

  @Field(() => [WorkInfo], { nullable: true })
  workInfo?: WorkInfo[];
}

@ArgsType()
export class UpdateUserArgs {
  @Field(() => ID)
  userId: Types.ObjectId;

  @Field(() => UpdateUserInput, { nullable:true })
  data: UpdateUserInput;
}

@ObjectType()
export class UserPayload {
  @Field(() => Int)
  resourceCount: number;

  @Field(() => Int)
  pageCount: number;

  @Field(() => Int)
  currentPage: number;

  @Field(() => [User])
  data: User[];
}
