"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthResolver = void 0;
const auth_service_1 = require("./auth.service");
const graphql_1 = require("@nestjs/graphql");
const admin_type_1 = require("../admin/admin.type");
const auth_input_1 = require("./auth.input");
const session_types_1 = require("../session/session.types");
const auth_decorator_1 = require("./decorators/auth.decorator");
const types_1 = require("../shared/types");
const users_type_1 = require("../users/users.type");
const session_service_1 = require("../session/session.service");
const article_service_1 = require("../article/article.service");
const article_type_1 = require("../article/article.type");
const admin_input_1 = require("../admin/admin.input");
const users_input_1 = require("../users/users.input");
let AuthResolver = class AuthResolver {
    constructor(authService, articleService) {
        this.authService = authService;
        this.articleService = articleService;
    }
    async registerAdmin(data) {
        return this.authService.registerAdmin(data);
    }
    loginAdmin(data) {
        return this.authService.loginAdmin(data);
    }
    async adminLogout(req) {
        const dd = await this.authService.logoutAdmin(req.user);
        return dd.message;
    }
    async login(code, ctx) {
        const session = await this.authService.loginUser(code);
        ctx.res.cookie('token', session.token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 1000 * 60 * 60 * 24 * 365,
        });
        return session;
    }
    logout(ctx) {
        ctx.res.clearCookie('token');
        return this.authService.logoutUser(ctx.req.user);
    }
    async me(ctx) {
        console.count(`token: ${ctx.req.cookies.token}`);
        return this.authService.getMe(ctx);
    }
    async profile(username) {
        return this.authService.getUserProfile(username);
    }
    async updateProfile(ctx, data) {
        return this.authService.updateUser(ctx.req.user.sub, data);
    }
};
__decorate([
    graphql_1.Mutation(() => admin_type_1.Admin),
    __param(0, graphql_1.Args('data')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [admin_input_1.CreateAdminInput]),
    __metadata("design:returntype", Promise)
], AuthResolver.prototype, "registerAdmin", null);
__decorate([
    graphql_1.Mutation(() => auth_input_1.AuthPayload),
    __param(0, graphql_1.Args('data')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_input_1.LoginDTO]),
    __metadata("design:returntype", Promise)
], AuthResolver.prototype, "loginAdmin", null);
__decorate([
    graphql_1.Mutation(() => String),
    auth_decorator_1.Auth(session_types_1.AUTH_DOMAIN.ADMIN),
    __param(0, graphql_1.Context('req')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthResolver.prototype, "adminLogout", null);
__decorate([
    graphql_1.Mutation(() => auth_input_1.AuthPayload),
    __param(0, graphql_1.Args('oAuthCode')),
    __param(1, graphql_1.Context()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], AuthResolver.prototype, "login", null);
__decorate([
    auth_decorator_1.Auth(session_types_1.AUTH_DOMAIN.USER),
    graphql_1.Mutation(() => String),
    __param(0, graphql_1.Context()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthResolver.prototype, "logout", null);
__decorate([
    graphql_1.Query(() => users_type_1.User, { nullable: true }),
    __param(0, graphql_1.Context()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthResolver.prototype, "me", null);
__decorate([
    graphql_1.Query(() => users_type_1.User),
    __param(0, graphql_1.Args('username')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AuthResolver.prototype, "profile", null);
__decorate([
    auth_decorator_1.Auth(session_types_1.AUTH_DOMAIN.USER),
    graphql_1.Mutation(() => users_type_1.User),
    __param(0, graphql_1.Context()),
    __param(1, graphql_1.Args('data')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, users_input_1.UpdateUserInput]),
    __metadata("design:returntype", Promise)
], AuthResolver.prototype, "updateProfile", null);
AuthResolver = __decorate([
    graphql_1.Resolver(() => auth_input_1.AuthPayload),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        article_service_1.ArticleService])
], AuthResolver);
exports.AuthResolver = AuthResolver;
//# sourceMappingURL=auth.resolver.js.map