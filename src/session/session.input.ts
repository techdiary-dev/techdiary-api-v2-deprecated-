import {
    ObjectType, 
    Field,
    Int,
    
} from "@nestjs/graphql";

import { Session } from "../session/session.model";



@ObjectType()
export class SessionPayload {
    @Field(() => Int)
    resourceCount: number;

    @Field(() => Int)
    pageCount: number;

    @Field(() => Int)
    currentPage: number;

    @Field(() => [Session])
    data: Session[];
}

