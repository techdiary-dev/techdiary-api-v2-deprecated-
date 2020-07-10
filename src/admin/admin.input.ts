import { IsNotEmpty, IsEmail } from 'class-validator';
import { InputType, Field, PartialType } from '@nestjs/graphql';
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
export class UpdateAdminInput extends PartialType(CreateAdminInput) {}
