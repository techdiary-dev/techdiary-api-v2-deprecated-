import { IsNotEmpty, IsEmail } from 'class-validator';
import { InputType, Field, PartialType, ArgsType } from '@nestjs/graphql';
import { Admin } from './admin.type';

@InputType()
export class CreateAdminInput {
  @Field()
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @Field()
  username: string;
  @Field()
  @IsNotEmpty()
  @IsEmail({}, { message: 'Invalid email address' })
  email: string;

  @Field()
  @IsNotEmpty()
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
  newPassword: string

}


@ArgsType()
export class UpdatePasswordArgs {
  @Field(() => UpdatePassword)
  data: UpdatePassword;
}
