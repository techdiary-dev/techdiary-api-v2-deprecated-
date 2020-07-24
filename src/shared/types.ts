import {} from 'class-validator';
import { Request, Response } from 'express';
import { InputType, Field, Int, ObjectType } from '@nestjs/graphql';
import { JWTPayload } from 'src/session/session.type';

@ObjectType()
export class ResourceList<DataModel> {
  @Field()
  currentPage: number;

  @Field()
  pageCount: number;

  @Field()
  resourceCount: number;

  @Field(() => [DataModel])
  data: DataModel[];
}

@InputType()
export class PaginationInput {
  @Field(() => Int, { nullable: true })
  limit?: number;

  @Field({ nullable: true })
  sort?: string;

  @Field(() => Int, { nullable: true })
  page?: number;
}

export interface iRequest extends Request {
  user: JWTPayload;
}

export default interface AppContext {
  req: iRequest;
  res: Response;
}
