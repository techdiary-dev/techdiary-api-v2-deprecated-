import { AuthService } from './auth.service';
import { Resolver, Mutation, Args, Query, Context } from '@nestjs/graphql';
import { Admin } from 'src/admin/admin.type';
import { AdminRegisterDTO, LoginDTO, AuthPayload } from './auth.input';
import { AUTH_DOMAIN, SessionRequest } from 'src/session/session.types';
import { Auth } from './decorators/auth.decorator';
import AppContext from 'src/shared/types';
import { User } from 'src/users/users.type';
import { SessionService } from 'src/session/session.service';

@Resolver()
export class AuthResolver {
  constructor(
    private readonly authService: AuthService,
    private readonly sessionService: SessionService,
  ) {}

  @Query(() => String)
  test(): string {
    return 'this.authService.registerAdmin(data)';
  }

  @Mutation(() => Admin)
  async registerAdmin(@Args('data') data: AdminRegisterDTO): Promise<Admin> {
    return this.authService.registerAdmin(data);
  }

  @Mutation(() => AuthPayload)
  loginAdmin(@Args('data') data: LoginDTO): Promise<AuthPayload> {
    return this.authService.loginAdmin(data);
  }

  @Mutation(() => String)
  @Auth(AUTH_DOMAIN.ADMIN)
  async adminLogout(@Context('req') req: SessionRequest): Promise<any> {
    const dd = await this.authService.logoutAdmin(req.user);
    return dd.message;
  }

  @Mutation(() => AuthPayload)
  async login(@Args('oAuthCode') code: string): Promise<AuthPayload> {
    return this.authService.loginUser(code);
  }

  @Auth(AUTH_DOMAIN.USER)
  @Mutation(() => String)
  logout(@Context() ctx: AppContext): Promise<string> {
    return this.authService.logoutUser(ctx.req.user);
  }

  @Query(() => User, { nullable: true })
  async me(@Context() ctx: AppContext): Promise<User> {
    return this.authService.getUser(ctx);
  }

  //   @Mutation(() => User)
  //   @UseFilters(MongoExceptionFilter)
  //   registerUser(@Args('data') data: UserRegisterDTO): Promise<User> {
  //     return this.authService.registerUser(data);
  //   }

  //   @Mutation(() => AuthPayload)
  //   loginUser(@Args() data: UserLoginDTO): Promise<AuthPayload> {
  //     return this.authService.loginUser(data);
  //   }
}
