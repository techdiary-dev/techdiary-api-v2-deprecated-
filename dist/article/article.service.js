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
exports.ArticleService = void 0;
const common_1 = require("@nestjs/common");
const article_type_1 = require("./article.type");
const nestjs_typegoose_1 = require("nestjs-typegoose");
const types_1 = require("../shared/types");
const quick_crud_1 = require("quick-crud");
let ArticleService = class ArticleService {
    constructor(model) {
        this.model = model;
    }
    async getArticleByIdOrSlug(idOrSlug) {
        return await this.model.findOne(idOrSlug);
    }
    async getAuthorArticles(authorId, paginationOptions, isPublished) {
        const filtered = { author: authorId };
        if (isPublished)
            filtered.isPublished = isPublished;
        return await quick_crud_1.index({
            model: this.model,
            paginationOptions,
            where: Object.assign({}, filtered),
        });
    }
    async createArticle(data, authorId) {
        return this.model.create(Object.assign(Object.assign({}, data), { author: authorId }));
    }
    async updateArticle(data, _id, authorId) {
        const article = await this.model.findOne({ _id });
        if (!article)
            throw new common_1.NotFoundException('ডায়েরি পাওয়া যায়নি');
        if (!article.author.equals(authorId))
            throw new common_1.ForbiddenException('এটি আপনার ডায়েরি নয়');
        return this.model.findOneAndUpdate({ _id }, data, { new: true });
    }
    async getPublishedArticles(paginationOptions) {
        return await quick_crud_1.index({
            model: this.model,
            paginationOptions,
            where: { isPublished: true },
        });
    }
    async findSeriesArticles(article) {
        return this.model.find({
            seriesName: article.seriesName,
            author: article.author,
            isPublished: true,
        });
    }
    async deleteArticle(_id, authorId) {
        const article = await this.getArticleByIdOrSlug({ _id });
        if (!article)
            throw new common_1.NotFoundException('ডায়েরি পাওয়া যায়নি');
        if (!article.author.equals(authorId))
            throw new common_1.ForbiddenException('এটি আপনার ডায়েরি নয়');
        return this.model.findOneAndDelete({ _id });
    }
};
ArticleService = __decorate([
    common_1.Injectable(),
    __param(0, nestjs_typegoose_1.InjectModel(article_type_1.Article)),
    __metadata("design:paramtypes", [Object])
], ArticleService);
exports.ArticleService = ArticleService;
//# sourceMappingURL=article.service.js.map