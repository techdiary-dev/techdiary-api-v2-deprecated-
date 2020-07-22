import {} from 'class-validator';
import { Request, Response } from 'express';
import { InputType, Field, Int, ObjectType } from '@nestjs/graphql';
import { JWTPayload } from 'src/session/session.type';

@ObjectType()
export class ResourceList<DataModel> {
  currentPage: number;
  pageCount: number;
  resourceCount: number;
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
