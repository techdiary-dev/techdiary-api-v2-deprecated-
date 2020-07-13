import {
  Injectable,
  ForbiddenException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AdminService } from '../admin/admin.service';
import { SessionService } from 'src/session/session.service';
import { Admin } from 'src/admin/admin.type';
import { DocumentType } from '@typegoose/typegoose';
import { LoginDTO, AuthPayload } from './auth.input';
import { AUTH_DOMAIN, JWTPayload } from 'src/session/session.types';
import { JwtService } from '@nestjs/jwt';
import { RoleService } from 'src/role/role.service';
import { UsersService } from 'src/users/users.service';
import axios from 'axios';
import { User } from 'src/users/users.type';
import AppContext from 'src/shared/types';
import { CreateAdminInput, UpdateAdminInput } from 'src/admin/admin.input';
import { Types } from 'mongoose';
import { UpdateUserInput } from 'src/users/users.input';

@Injectable()
export class AuthService {
  constructor(
    private readonly adminService: AdminService,
    private readonly usersService: UsersService,
    private readonly roleService: RoleService,
    private readonly config: ConfigService,
    private readonly sessionService: SessionService,
    private readonly jwt: JwtService,
  ) {}

  async registerAdmin(data: CreateAdminInput): Promise<DocumentType<Admin>> {
    // 1. check if a there is already an admin
    const count = await this.adminService.count();
    if (count)
      throw new ForbiddenException('Admin registration has been truned off');
    this.roleService.createDefaultRole();

    return this.adminService.create(data);
  }

  /**
   * Login an admin
   * @param data AdminLoginDTO
   */
  async loginAdmin(data: LoginDTO): Promise<AuthPayload> {
    console.log(data);
    const { identifier, password } = data;

    // find admin with identifier
    const admin = await this.adminService.getByIdentifier(identifier);
    if (!admin) throw new UnauthorizedException();

    // Matched password
    const passwordMatched = await admin.comparePassword(password);
    if (!passwordMatched) throw new UnauthorizedException();

    // generate token for admin
    const token = await this.sessionService.findOrCreateSession(
      admin._id,
      AUTH_DOMAIN.ADMIN,
    );
    return token;
  }

  /**
   * Logout an admin
   * @param token JWTPayload
   */
  async logoutAdmin(token: JWTPayload): Promise<{ message: string }> {
    const { sub, domain } = token;
    if (this.sessionService.deleteSession(sub, domain)) {
      return {
        message: 'You have logged out successfully',
      };
    } else {
      throw new ForbiddenException();
    }
  }

  async loginUser(code: string): Promise<AuthPayload> {
    const {
      id: githubUID,
      login: username,
      name,
      avatar_url: profilePhoto,
      email,
      bio,
      location,
    } = await this.getGithubUserInfoByCode(code);

    const user = await this.usersService.findOrCreateUser({
      githubUID,
      name,
      username,
      profilePhoto,
      email,
      bio,
      location,
    });

    return this.sessionService.findOrCreateSession(user._id, AUTH_DOMAIN.USER);
  }

  /**
   * Logout a User
   * @param token JWTPayload
   */
  async logoutUser(token: JWTPayload): Promise<string> {
    const { sub, domain } = token;
    if (this.sessionService.deleteSession(sub, domain)) {
      return 'You have logged out successfully';
    } else {
      throw new ForbiddenException(
        'Invalid token or you have already been logged out',
      );
    }
  }

  async getMe(ctx: AppContext): Promise<DocumentType<User>> {
    // get the token either from authorization headers or cookie
    const cookieOrheader =
      ctx.req.headers.authorization.replace('Bearer ', '') ||
      ctx.req.cookies?.token;
    if (!cookieOrheader) return null;

    const token = await this.jwt.verifyAsync(cookieOrheader);

    if (!token) return null;
    else {
      if (token.sub) {
        const sessionExists = await this.sessionService.getSession(
          token.sub,
          AUTH_DOMAIN.USER,
        );
        if (sessionExists === null) {
          ctx.res.clearCookie('token');
          return null;
        }
      }
      return this.usersService.getById(token.sub);
    }
  }

  async getUserProfile(username: string): Promise<DocumentType<User>> {
    return this.usersService.getByUsername(username);
  }

  async updateAdmin(_id: Types.ObjectId, data: UpdateAdminInput) {
    return this.adminService.update(_id, data);
  }

  async updateUser(_id: Types.ObjectId, data: UpdateUserInput) {
    return this.usersService.update(_id, data);
  }

  async getGithubUserInfoByCode(code: string): Promise<any> {
    return new Promise((resolve, reject) => {
      const client_id: string = this.config.get('GITHUB_APP_CLIENT_ID');
      const client_secret: string = this.config.get('GITHUB_APP_CLIENT_SECRET');
      const url = `https://github.com/login/oauth/access_token?client_id=${client_id}&client_secret=${client_secret}&code=${code}`;

      axios
        .post(url)
        .then(data => {
          const token = data.data.split('&')[0].split('=')[1];
          axios
            .get('https://api.github.com/user', {
              headers: {
                Authorization: `token ${token}`,
              },
            })
            .then(data => {
              resolve(data.data);
            })
            .catch(e => {
              reject(new Error('Invalid or expired Github oAuth code'));
            });
        })
        .catch(e => {
          reject(new Error('Invalid or expired Github oAuth code'));
        });
    });
  }
}
