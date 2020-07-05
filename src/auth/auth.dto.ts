import { IsNotEmpty, IsEmail } from 'class-validator';
import { AUTH_DOMAIN } from 'src/session/session.types';
import { ApiProperty } from '@nestjs/swagger';
import { InputType, Field, ObjectType } from '@nestjs/graphql';
// import { ApiProperty } from '@nestjs/swagger';

@InputType()
export class AdminRegisterDTO {
  @Field()
  @ApiProperty({
    type: String,
    description: 'Admin username',
    required: true,
  })
  @IsNotEmpty()
  name: string;

  @Field()
  @ApiProperty({
    type: String,
    description: 'Admin username',
    required: true,
  })
  @IsNotEmpty()
  username: string;

  @Field()
  @ApiProperty({
    type: String,
    description: 'Admin email address',
    required: true,
  })
  @IsNotEmpty()
  @IsEmail({}, { message: 'Invalid email address' })
  email: string;

  @Field()
  @ApiProperty({
    type: String,
    description: 'Password for admin',
    required: true,
  })
  @IsNotEmpty()
  password: string;
}

@InputType()
export class LoginDTO {
  @Field()
  @ApiProperty({
    type: String,
    description: 'username/email address',
    required: true,
  })
  @IsNotEmpty()
  identifier: string;

  @Field()
  @ApiProperty({
    type: String,
    description: 'password',
    required: true,
  })
  @IsNotEmpty()
  password: string;
}

export class UserLoginDTO extends LoginDTO {}

@ObjectType()
export class AuthPayload {
  // @Field(() => AUTH_DOMAIN)
  // domain: AUTH_DOMAIN;

  @Field()
  token: string;
}

@InputType()
export class UserRegisterDTO {
  @Field()
  @ApiProperty({
    type: String,
    required: true,
  })
  @IsNotEmpty()
  name: string;

  @Field()
  @ApiProperty({
    type: String,
    required: true,
  })
  @IsNotEmpty()
  username: string;

  @Field()
  @ApiProperty({
    type: String,
    required: true,
  })
  @IsNotEmpty()
  @IsEmail({}, { message: 'Invalid email address' })
  email: string;
  @Field()
  @ApiProperty({
    type: String,
    required: true,
  })
  @IsNotEmpty()
  password: string;
}
