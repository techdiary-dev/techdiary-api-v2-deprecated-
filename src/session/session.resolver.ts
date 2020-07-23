import {
  Resolver,
  Query,
  Context,
  Args,
  ResolveField,
  Parent,
  Mutation,
} from '@nestjs/graphql';

import { SessionService } from './session.service';
import { SessionPayload } from './session.input';
import { SessionRequest, AUTH_DOMAIN, Session } from './session.type';
import { PaginationInput, ResourceList } from 'src/shared/types';
import { Auth } from 'src/auth/decorators/auth.decorator';

import { UsersService } from 'src/users/users.service';
import { AdminService } from 'src/admin/admin.service';
import { Types } from 'mongoose';

@Resolver(() => Session)
export class SessionResolver {
  constructor(
    private readonly sessionService: SessionService,
    private readonly userService: UsersService,
    private readonly adminService: AdminService,
  ) {}

  @Auth(AUTH_DOMAIN.ADMIN)
  @Query(() => SessionPayload)
  async sessions(
    @Context('req') req: SessionRequest,
    @Args('pagination', { nullable: true }) query: PaginationInput,
  ): Promise<ResourceList<Session>> {
    return this.sessionService.getAllSession(req.user.sub, query);
  }

  @Auth(AUTH_DOMAIN.ADMIN)
  @Mutation(() => String)
  async removeSession(
    @Args('sub') sub: string,
    @Args('domain') domain: AUTH_DOMAIN,
  ): Promise<string> {
    await this.sessionService.deleteSession(Types.ObjectId(sub), domain);
    return 'Session deleted successfully';
  }

  @ResolveField()
  async username(@Parent() parent: Session): Promise<string> {
    if (parent.domain === AUTH_DOMAIN.ADMIN) {
      const { username } = await this.adminService.getById(parent.sub);
      return username;
    }

    if (parent.domain === AUTH_DOMAIN.USER) {
      const { username } = await this.userService.getById(parent.sub);
      return username;
    }
  }
}
