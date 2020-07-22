import { AuthService } from './auth.service';
import {
  Resolver,
  Mutation,
  Args,
  Query,
  Context,
  ResolveField,
  Parent,
  createUnionType,
} from '@nestjs/graphql';
import { Admin } from 'src/admin/admin.type';
import { LoginDTO, AuthPayload } from './auth.input';
import { AUTH_DOMAIN, SessionRequest } from 'src/session/session.types';
import { Auth } from './decorators/auth.decorator';
import AppContext, { PaginationInput, ResourceList } from 'src/shared/types';
import { User } from 'src/users/users.type';
import { SessionService } from 'src/session/session.service';
import { ArticleService } from 'src/article/article.service';
import { Types } from 'mongoose';
import { Article } from 'src/article/article.type';
import { CreateAdminInput, UpdateAdminInput } from 'src/admin/admin.input';
import { type } from 'os';
import { UpdateUserInput } from 'src/users/users.input';

@Resolver(() => AuthPayload)
export class AuthResolver {
  constructor(
    private readonly authService: AuthService,
    private readonly articleService: ArticleService,
  ) {}

  // @Query(() => String)
  // test(): string {
  //   return 'this.authService.registerAdmin(data)';
  // }

  @Mutation(() => Admin)
  async registerAdmin(@Args('data') data: CreateAdminInput): Promise<Admin> {
    return this.authService.registerAdmin(data);
  }

  @Mutation(() => AuthPayload)
  async loginAdmin(
    @Args('data') data: LoginDTO,
    @Context() ctx: AppContext,
  ): Promise<AuthPayload> {
    const session = await this.authService.loginAdmin(data);
    ctx.res.cookie('token', session.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 1000 * 60 * 60 * 24 * 365, // 1 year cookie
    });
    return session;
  }

  @Mutation(() => String)
  @Auth(AUTH_DOMAIN.ADMIN)
  async adminLogout(@Context('req') req: SessionRequest): Promise<any> {
    const dd = await this.authService.logoutAdmin(req.user);
    return dd.message;
  }

  @Mutation(() => AuthPayload)
  async login(
    @Args('oAuthCode') code: string,
    @Context() ctx: AppContext,
  ): Promise<AuthPayload> {
    const session = await this.authService.loginUser(code);
    ctx.res.cookie('token', session.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 1000 * 60 * 60 * 24 * 365, // 1 year cookie
    });
    return session;
  }

  @Auth(AUTH_DOMAIN.USER)
  @Mutation(() => String)
  logout(@Context() ctx: AppContext): Promise<string> {
    ctx.res.clearCookie('token');
    return this.authService.logoutUser(ctx.req.user);
  }

  @Query(() => User, { nullable: true })
  async me(@Context() ctx: AppContext): Promise<User> {
    return this.authService.getMe(ctx);
  }

  @Query(() => User)
  async profile(@Args('username') username: string) {
    return this.authService.getUserProfile(username);
  }

  @Auth(AUTH_DOMAIN.USER)
  @Mutation(() => User)
  async updateProfile(
    @Context() ctx: AppContext,
    @Args('data') data: UpdateUserInput,
  ) {
    return this.authService.updateUser(ctx.req.user.sub, data);
  }
}
