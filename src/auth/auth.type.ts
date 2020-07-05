import { ObjectType } from '@nestjs/graphql';

@ObjectType()
export class AuthPayload {
  token: string;
}
