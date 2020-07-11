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
exports.UserResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const users_type_1 = require("./users.type");
const types_1 = require("../shared/types");
const article_type_1 = require("../article/article.type");
const users_service_1 = require("./users.service");
const article_service_1 = require("../article/article.service");
const mongoose_1 = require("mongoose");
let UserResolver = class UserResolver {
    constructor(userService, articleService) {
        this.userService = userService;
        this.articleService = articleService;
    }
    articles(author, pagination, info) {
        if (info.path.prev.key === 'me') {
            return this.articleService.getAuthorArticles(mongoose_1.Types.ObjectId(author._id), pagination);
        }
        return this.articleService.getAuthorArticles(mongoose_1.Types.ObjectId(author._id), pagination, true);
    }
};
__decorate([
    graphql_1.ResolveField(() => users_type_1.User),
    __param(0, graphql_1.Parent()),
    __param(1, graphql_1.Args('pagination', { nullable: true })),
    __param(2, graphql_1.Info()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_type_1.User,
        types_1.PaginationInput, Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "articles", null);
UserResolver = __decorate([
    graphql_1.Resolver(() => users_type_1.User),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        article_service_1.ArticleService])
], UserResolver);
exports.UserResolver = UserResolver;
//# sourceMappingURL=users.resolver.js.map