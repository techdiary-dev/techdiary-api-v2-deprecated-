import { ConfigService } from '@nestjs/config';
import { AdminService } from '../admin/admin.service';
import { SessionService } from 'src/session/session.service';
import { Admin } from 'src/admin/admin.type';
import { DocumentType } from '@typegoose/typegoose';
import { LoginDTO, AuthPayload } from './auth.input';
import { JWTPayload } from 'src/session/session.types';
import { JwtService } from '@nestjs/jwt';
import { RoleService } from 'src/role/role.service';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/users.type';
import AppContext from 'src/shared/types';
import { CreateAdminInput, UpdateAdminInput } from 'src/admin/admin.input';
import { Types } from 'mongoose';
import { UpdateUserInput } from 'src/users/users.input';
export declare class AuthService {
    private readonly adminService;
    private readonly usersService;
    private readonly roleService;
    private readonly config;
    private readonly sessionService;
    private readonly jwt;
    constructor(adminService: AdminService, usersService: UsersService, roleService: RoleService, config: ConfigService, sessionService: SessionService, jwt: JwtService);
    registerAdmin(data: CreateAdminInput): Promise<DocumentType<Admin>>;
    loginAdmin(data: LoginDTO): Promise<AuthPayload>;
    logoutAdmin(token: JWTPayload): Promise<{
        message: string;
    }>;
    loginUser(code: string): Promise<AuthPayload>;
    logoutUser(token: JWTPayload): Promise<string>;
    getMe(ctx: AppContext): Promise<DocumentType<User>>;
    getUserProfile(username: string): Promise<DocumentType<User>>;
    updateAdmin(_id: Types.ObjectId, data: UpdateAdminInput): Promise<DocumentType<Admin>>;
    updateUser(_id: Types.ObjectId, data: UpdateUserInput): Promise<DocumentType<User>>;
    getGithubUserInfoByCode(code: string): Promise<any>;
}
