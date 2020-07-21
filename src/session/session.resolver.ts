import { Resolver, Query, Context, Args, ResolveField, Parent } from '@nestjs/graphql';
import { SessionService } from './session.service';
import { SessionPayload } from './session.input';
import { SessionRequest, AUTH_DOMAIN } from './session.types';
import { PaginationInput, ResourceList } from 'src/shared/types';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Session } from "./session.model";
import { UsersService } from 'src/users/users.service';
import { AdminService } from 'src/admin/admin.service';
import { Injectable } from '@nestjs/common';

@Injectable()
@Resolver('Session')
export class SessionResolver {


    constructor(
        private readonly sessionService: SessionService,
        private readonly userService: UsersService,
        private readonly adminService: AdminService
    ) { }

    @Auth(AUTH_DOMAIN.ADMIN)
    @Query(() => SessionPayload)
    async sessions(@Context('req') req: SessionRequest, @Args('pagination', { nullable: true }) query: PaginationInput): Promise<ResourceList<Session>> {
        return this.sessionService.getAllSession(req.user.sub, query)
    }

    @ResolveField()
    async username(@Parent() parent: Session): Promise<string> {
        // @ts-ignore
        if (parent.domain === AUTH_DOMAIN.ADMIN) {

            const { username } = await this.adminService.getById(parent.sub)
            return username
        }

        if (parent.domain === AUTH_DOMAIN.USER) {
            const { username } = await this.userService.getById(parent.sub)
            return username
        }

    }
}
