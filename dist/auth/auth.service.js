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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const admin_service_1 = require("../admin/admin.service");
const session_service_1 = require("../session/session.service");
const admin_type_1 = require("../admin/admin.type");
const session_types_1 = require("../session/session.types");
const jwt_1 = require("@nestjs/jwt");
const role_service_1 = require("../role/role.service");
const users_service_1 = require("../users/users.service");
const axios_1 = require("axios");
const users_type_1 = require("../users/users.type");
const types_1 = require("../shared/types");
const admin_input_1 = require("../admin/admin.input");
const users_input_1 = require("../users/users.input");
let AuthService = class AuthService {
    constructor(adminService, usersService, roleService, config, sessionService, jwt) {
        this.adminService = adminService;
        this.usersService = usersService;
        this.roleService = roleService;
        this.config = config;
        this.sessionService = sessionService;
        this.jwt = jwt;
    }
    async registerAdmin(data) {
        const count = await this.adminService.count();
        if (count)
            throw new common_1.ForbiddenException('Admin registration has been truned off');
        this.roleService.createDefaultRole();
        return this.adminService.create(data);
    }
    async loginAdmin(data) {
        console.log(data);
        const { identifier, password } = data;
        const admin = await this.adminService.getByIdentifier(identifier);
        if (!admin)
            throw new common_1.UnauthorizedException();
        const passwordMatched = await admin.comparePassword(password);
        if (!passwordMatched)
            throw new common_1.UnauthorizedException();
        const token = await this.sessionService.findOrCreateSession(admin._id, session_types_1.AUTH_DOMAIN.ADMIN);
        return token;
    }
    async logoutAdmin(token) {
        const { sub, domain } = token;
        if (this.sessionService.deleteSession(sub, domain)) {
            return {
                message: 'You have logged out successfully',
            };
        }
        else {
            throw new common_1.ForbiddenException();
        }
    }
    async loginUser(code) {
        const { id: githubUID, login: username, name, avatar_url: profilePhoto, email, bio, location, } = await this.getGithubUserInfoByCode(code);
        const user = await this.usersService.findOrCreateUser({
            githubUID,
            name,
            username,
            profilePhoto,
            email,
            bio,
            location,
        });
        return this.sessionService.findOrCreateSession(user._id, session_types_1.AUTH_DOMAIN.USER);
    }
    async logoutUser(token) {
        const { sub, domain } = token;
        if (this.sessionService.deleteSession(sub, domain)) {
            return 'You have logged out successfully';
        }
        else {
            throw new common_1.ForbiddenException('Invalid token or you have already been logged out');
        }
    }
    async getMe(ctx) {
        var _a, _b;
        if (!((_a = ctx.req.cookies) === null || _a === void 0 ? void 0 : _a.token))
            return null;
        const token = await this.jwt.verifyAsync((_b = ctx.req.cookies) === null || _b === void 0 ? void 0 : _b.token);
        if (!token)
            return null;
        else {
            if (token.sub) {
                const sessionExists = await this.sessionService.getSession(token.sub, session_types_1.AUTH_DOMAIN.USER);
                if (sessionExists === null) {
                    ctx.res.clearCookie('token');
                    return null;
                }
            }
            return this.usersService.getById(token.sub);
        }
    }
    async getUserProfile(username) {
        return this.usersService.getByUsername(username);
    }
    async updateAdmin(_id, data) {
        return this.adminService.update(_id, data);
    }
    async updateUser(_id, data) {
        return this.usersService.update(_id, data);
    }
    async getGithubUserInfoByCode(code) {
        return new Promise((resolve, reject) => {
            const client_id = this.config.get('GITHUB_APP_CLIENT_ID');
            const client_secret = this.config.get('GITHUB_APP_CLIENT_SECRET');
            const url = `https://github.com/login/oauth/access_token?client_id=${client_id}&client_secret=${client_secret}&code=${code}`;
            axios_1.default
                .post(url)
                .then(data => {
                const token = data.data.split('&')[0].split('=')[1];
                axios_1.default
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
};
AuthService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [admin_service_1.AdminService,
        users_service_1.UsersService,
        role_service_1.RoleService,
        config_1.ConfigService,
        session_service_1.SessionService,
        jwt_1.JwtService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map