import {} from 'class-validator';
import { Request, Response } from 'express';
import { InputType, Field, Int, ObjectType } from '@nestjs/graphql';
import { JWTPayload } from 'src/session/session.type';
import { Type } from '@nestjs/common';

@ObjectType()
export class ResourceList<DataModel> {
  currentPage: number;

  pageCount: number;

  resourceCount: number;

  data: DataModel[];
}

export function Pagination<DataModel>(dataClass: Type<DataModel>): any {
  @ObjectType({ isAbstract: true })
  abstract class Resource {
    @Field()
    currentPage: number;

    @Field()
    pageCount: number;

    @Field()
    resourceCount: number;

    @Field(() => [dataClass])
    data: DataModel[];
  }

  return Resource;
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
