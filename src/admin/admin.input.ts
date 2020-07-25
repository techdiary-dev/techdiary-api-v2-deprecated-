import { IsNotEmpty, IsEmail } from 'class-validator';
import {
  InputType,
  Field,
  ArgsType,
  Int,
  ObjectType,
} from '@nestjs/graphql';
import { Admin } from './admin.type';

@InputType()
export class CreateAdminInput {
  @Field()
  @IsNotEmpty({ message: 'Name is required' })
  name: string;

  @IsNotEmpty({ message: 'Username is required' })
  @Field()
  username: string;
  @Field()
  @IsNotEmpty({ message: 'email is required' })
  @IsEmail({}, { message: 'Invalid email address' })
  email: string;

  @Field()
  @IsNotEmpty({ message: 'password is required' })
  password: string;
}

@InputType()
export class UpdateAdminInput {
  @Field({ nullable: true })
  name: string;

  @Field({ nullable: true })
  username: string;

  @Field({ nullable: true })
  @IsEmail({}, { message: 'Invalid email address' })
  email: string;
}

@ArgsType()
export class UpdateAdminArgs {
  @Field(() => UpdateAdminInput, { nullable: true })
  data: UpdateAdminInput;
}

@InputType()
export class UpdatePassword {
  @Field(() => String)
  @IsNotEmpty()
  oldPassword: string;

  @Field(() => String)
  @IsNotEmpty()
  newPassword: string;
}

@ArgsType()
export class UpdatePasswordArgs {
  @Field(() => UpdatePassword)
  data: UpdatePassword;
}

@ObjectType()
export class AdminPayload {
  @Field(() => Int)
  resourceCount: number;

  @Field(() => Int)
  pageCount: number;

  @Field(() => Int)
  currentPage: number;

  @Field(() => [Admin])
  data: Admin[];
}
