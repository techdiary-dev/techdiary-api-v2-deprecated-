import { AuthService } from './auth.service';
import { Admin } from 'src/admin/admin.type';
import { LoginDTO, AuthPayload } from './auth.input';
import { SessionRequest } from 'src/session/session.types';
import AppContext from 'src/shared/types';
import { User } from 'src/users/users.type';
import { ArticleService } from 'src/article/article.service';
import { CreateAdminInput } from 'src/admin/admin.input';
import { UpdateUserInput } from 'src/users/users.input';
export declare class AuthResolver {
    private readonly authService;
    private readonly articleService;
    constructor(authService: AuthService, articleService: ArticleService);
    registerAdmin(data: CreateAdminInput): Promise<Admin>;
    loginAdmin(data: LoginDTO): Promise<AuthPayload>;
    adminLogout(req: SessionRequest): Promise<any>;
    login(code: string, ctx: AppContext): Promise<AuthPayload>;
    logout(ctx: AppContext): Promise<string>;
    me(ctx: AppContext): Promise<User>;
    profile(username: string): Promise<import("@typegoose/typegoose").DocumentType<User>>;
    updateProfile(ctx: AppContext, data: UpdateUserInput): Promise<import("@typegoose/typegoose").DocumentType<User>>;
}
