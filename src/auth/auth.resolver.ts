import { AuthService } from './auth.service';
import { Resolver, Mutation, Args, Query, Context } from '@nestjs/graphql';
import { Admin } from 'src/admin/admin.type';
import {
  AdminRegisterDTO,
  LoginDTO,
  AuthPayload,
  UserRegisterDTO,
  UserLoginDTO,
} from './auth.dto';
import { AUTH_DOMAIN, SessionRequest } from 'src/session/session.types';
import { Auth } from './decorators/auth.decorator';
import { User } from 'src/users/users.model';
import { MongoExceptionFilter } from 'src/utils/app-exception.filter';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

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
