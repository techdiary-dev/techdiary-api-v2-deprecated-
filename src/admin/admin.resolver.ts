import { Resolver, Query, Args, Mutation, Context } from '@nestjs/graphql';
import { AdminService } from './admin.service';
import { SessionPayload } from 'src/session/session.input';
import AppContext, { PaginationInput, ResourceList } from 'src/shared/types';
import { Session } from '../session/session.model';
import { Types } from 'mongoose';
import { AUTH_DOMAIN, SessionRequest } from 'src/session/session.types';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Admin } from './admin.type';
import { UpdatePasswordArgs, CreateAdminInput, UpdateAdminArgs } from './admin.input';
import { UserPayload } from 'src/users/users.input';
import { User } from 'src/users/users.type';



@Resolver('Admin')
export class AdminResolver {

    constructor(private readonly adminService: AdminService) { }

   
    @Auth(AUTH_DOMAIN.ADMIN)
    @Query(() => UserPayload)
    async getAllUsers(@Args('pagination', { nullable: true }) query: PaginationInput): Promise<ResourceList<User>> {
        return this.adminService.getAllUsers(query)
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

    @Auth(AUTH_DOMAIN.ADMIN)
    @Mutation(() => String)
    async changePassword(@Context('req') req: SessionRequest, @Args() { data }: UpdatePasswordArgs): Promise<string> {
        return this.adminService.changePassword(req.user.sub, data)
    }


    @Auth(AUTH_DOMAIN.ADMIN)
    @Mutation(() => Admin)
    async addAdmin(@Args('data') data: CreateAdminInput): Promise<Admin> {
        return this.adminService.create(data);
    }


    @Auth(AUTH_DOMAIN.ADMIN)
    @Mutation(() => Admin)
    async updateAdmin(@Context('req') req: SessionRequest, @Args() { data }: UpdateAdminArgs): Promise<Admin> {
        console.log(data)
        return this.adminService.update(req.user.sub, data)
    }
}

