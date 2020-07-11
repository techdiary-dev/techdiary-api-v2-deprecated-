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
exports.ArticleResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const article_type_1 = require("./article.type");
const article_input_1 = require("./article.input");
const types_1 = require("../shared/types");
const article_service_1 = require("./article.service");
const mongoose_1 = require("mongoose");
const auth_decorator_1 = require("../auth/decorators/auth.decorator");
let ArticleResolver = class ArticleResolver {
    constructor(articleService) {
        this.articleService = articleService;
    }
    async articles(paginationOptions) {
        return this.articleService.getPublishedArticles(paginationOptions);
    }
    async article(idOrSlug) {
        const article = await this.articleService.getArticleByIdOrSlug(idOrSlug);
        return article;
    }
    createArticle(data, ctx) {
        return this.articleService.createArticle(data, ctx.req.user.sub);
    }
    updateArticle({ data, _id }, ctx) {
        return this.articleService.updateArticle(data, mongoose_1.Types.ObjectId(_id), ctx.req.user.sub);
    }
    deleteArticle(_id, ctx) {
        return this.articleService.deleteArticle(mongoose_1.Types.ObjectId(_id), ctx.req.user.sub);
    }
    url(parent) {
        var _a;
        return `/${(_a = parent.author) === null || _a === void 0 ? void 0 : _a.username}/${parent.slug}`;
    }
    excerpt(parent, wordsCount) {
        return parent.body
            .split(' ')
            .slice(0, wordsCount)
            .join(' ');
    }
    series(parent) {
        return this.articleService.findSeriesArticles(parent);
    }
};
__decorate([
    graphql_1.Query(() => article_input_1.ArticlePayload),
    __param(0, graphql_1.Args('pagination', { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [types_1.PaginationInput]),
    __metadata("design:returntype", Promise)
], ArticleResolver.prototype, "articles", null);
__decorate([
    graphql_1.Query(() => article_type_1.Article),
    __param(0, graphql_1.Args('idOrSlug')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [article_input_1.idOrSlugArg]),
    __metadata("design:returntype", Promise)
], ArticleResolver.prototype, "article", null);
__decorate([
    graphql_1.Mutation(() => article_type_1.Article),
    auth_decorator_1.Auth(),
    __param(0, graphql_1.Args('data')),
    __param(1, graphql_1.Context()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [article_input_1.CreateArticleInput, Object]),
    __metadata("design:returntype", Promise)
], ArticleResolver.prototype, "createArticle", null);
__decorate([
    graphql_1.Mutation(() => article_type_1.Article),
    auth_decorator_1.Auth(),
    __param(0, graphql_1.Args()),
    __param(1, graphql_1.Context()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [article_input_1.updateArticleArgs, Object]),
    __metadata("design:returntype", Promise)
], ArticleResolver.prototype, "updateArticle", null);
__decorate([
    graphql_1.Mutation(() => article_type_1.Article),
    auth_decorator_1.Auth(),
    __param(0, graphql_1.Args('_id', { type: () => graphql_1.ID })),
    __param(1, graphql_1.Context()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ArticleResolver.prototype, "deleteArticle", null);
__decorate([
    graphql_1.ResolveField(),
    __param(0, graphql_1.Parent()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [article_type_1.Article]),
    __metadata("design:returntype", String)
], ArticleResolver.prototype, "url", null);
__decorate([
    graphql_1.ResolveField(),
    __param(0, graphql_1.Parent()),
    __param(1, graphql_1.Args('wordsCount', { nullable: true, defaultValue: 30 })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [article_type_1.Article, Number]),
    __metadata("design:returntype", String)
], ArticleResolver.prototype, "excerpt", null);
__decorate([
    graphql_1.ResolveField(),
    __param(0, graphql_1.Parent()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [article_type_1.Article]),
    __metadata("design:returntype", Promise)
], ArticleResolver.prototype, "series", null);
ArticleResolver = __decorate([
    graphql_1.Resolver(() => article_type_1.Article),
    __metadata("design:paramtypes", [article_service_1.ArticleService])
], ArticleResolver);
exports.ArticleResolver = ArticleResolver;
//# sourceMappingURL=article.resolver.js.map