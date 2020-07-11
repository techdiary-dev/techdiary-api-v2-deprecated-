"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const nestjs_typegoose_1 = require("nestjs-typegoose");
const graphql_1 = require("@nestjs/graphql");
const jwt_1 = require("@nestjs/jwt");
const admin_module_1 = require("./admin/admin.module");
const session_module_1 = require("./session/session.module");
const auth_module_1 = require("./auth/auth.module");
const role_module_1 = require("./role/role.module");
const users_module_1 = require("./users/users.module");
const article_module_1 = require("./article/article.module");
const config = new config_1.ConfigService();
let AppModule = class AppModule {
};
AppModule = __decorate([
    common_1.Module({
        imports: [
            graphql_1.GraphQLModule.forRoot({
                installSubscriptionHandlers: true,
                autoSchemaFile: 'techdiary.gql',
                path: '/',
                context: allre => {
                    return { req: allre.req, res: allre.res };
                },
                engine: {
                    reportSchema: true,
                },
                cors: false,
            }),
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            Object.assign(Object.assign({}, jwt_1.JwtModule.register({ secret: config.get('JWT_SECRET') })), { global: true }),
            nestjs_typegoose_1.TypegooseModule.forRoot(config.get('DATABASE_URL'), {
                useCreateIndex: true,
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useFindAndModify: true,
            }),
            admin_module_1.AdminModule,
            session_module_1.SessionModule,
            auth_module_1.AuthModule,
            role_module_1.RoleModule,
            users_module_1.UsersModule,
            article_module_1.ArticleModule,
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map