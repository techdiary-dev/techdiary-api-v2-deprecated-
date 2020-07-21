import { Resolver, Query, Args, Mutation, Context } from '@nestjs/graphql';
import { AdminService } from './admin.service';
import { SessionPayload } from 'src/session/session.input';
import AppContext, { PaginationInput, ResourceList } from 'src/shared/types';
import { Session } from '../session/session.model';
import { Types } from 'mongoose';
import { AUTH_DOMAIN, SessionRequest } from 'src/session/session.types';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Admin } from './admin.type';



@Resolver('Admin')
export class AdminResolver {

    constructor(private readonly adminService: AdminService) { }

    @Auth(AUTH_DOMAIN.ADMIN)
    @Query(() => SessionPayload)
    async sessions(@Context('req') req: SessionRequest,@Args('pagination', { nullable: true }) query: PaginationInput): Promise<ResourceList<Session>> {
        return this.adminService.getAllSession(req.user.sub,query)
    }

    @Auth(AUTH_DOMAIN.ADMIN)
    @Mutation(() => String)
    async removeSession(@Args('sub') sub: string, @Args('domain') domain: AUTH_DOMAIN): Promise<string> {
        //@ts-ignore
        return this.adminService.removeSession(sub, domain)
    }


    @Auth(AUTH_DOMAIN.ADMIN)
    @Query(() => Admin, { nullable: true })
    async getAdmin(@Context() ctx: AppContext): Promise<Admin> {
        return this.adminService.getMe(ctx);
    }
}

