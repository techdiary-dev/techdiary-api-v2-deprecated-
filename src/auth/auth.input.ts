import { IsNotEmpty, IsEmail } from 'class-validator';
import { AUTH_DOMAIN } from 'src/session/session.types';
import { ApiProperty } from '@nestjs/swagger';
import { InputType, Field, ObjectType } from '@nestjs/graphql';
// import { ApiProperty } from '@nestjs/swagger';

@InputType()
export class AdminRegisterDTO {
  @Field()
  @IsNotEmpty()
  name: string;

  @Field()
  @IsNotEmpty()
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
export class LoginDTO {
  @Field()
  @IsNotEmpty()
  identifier: string;

  @Field()
  @IsNotEmpty()
  password: string;
}

export class UserLoginDTO extends LoginDTO {}

@ObjectType()
export class AuthPayload {
  @Field(() => AUTH_DOMAIN)
  domain: AUTH_DOMAIN;
  @Field()
  token: string;
}
