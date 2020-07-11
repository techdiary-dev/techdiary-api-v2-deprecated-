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
var Article_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Article = void 0;
const graphql_1 = require("@nestjs/graphql");
const mongodb_1 = require("mongodb");
const typegoose_1 = require("@typegoose/typegoose");
const users_type_1 = require("../users/users.type");
const mongoosePopulate = require("mongoose-autopopulate");
const slugify_1 = require("../utils/slugify");
let Article = Article_1 = class Article {
};
__decorate([
    graphql_1.Field(() => graphql_1.ID),
    __metadata("design:type", mongodb_1.ObjectId)
], Article.prototype, "_id", void 0);
__decorate([
    graphql_1.Field(),
    typegoose_1.prop(),
    __metadata("design:type", String)
], Article.prototype, "title", void 0);
__decorate([
    graphql_1.Field(),
    typegoose_1.prop(),
    __metadata("design:type", String)
], Article.prototype, "slug", void 0);
__decorate([
    graphql_1.Field(),
    __metadata("design:type", String)
], Article.prototype, "excerpt", void 0);
__decorate([
    graphql_1.Field(),
    typegoose_1.prop(),
    __metadata("design:type", String)
], Article.prototype, "body", void 0);
__decorate([
    graphql_1.Field(),
    typegoose_1.prop(),
    __metadata("design:type", Boolean)
], Article.prototype, "isPublished", void 0);
__decorate([
    graphql_1.Field({ nullable: true }),
    typegoose_1.prop({ default: false }),
    __metadata("design:type", Boolean)
], Article.prototype, "isPinned", void 0);
__decorate([
    graphql_1.Field({ nullable: true }),
    typegoose_1.prop(),
    __metadata("design:type", String)
], Article.prototype, "thumbnail", void 0);
__decorate([
    graphql_1.Field(() => [String], { nullable: true }),
    typegoose_1.prop({ type: String }),
    __metadata("design:type", Array)
], Article.prototype, "tags", void 0);
__decorate([
    graphql_1.Field(() => users_type_1.User, { nullable: true }),
    typegoose_1.prop({ ref: 'User', autopopulate: true }),
    __metadata("design:type", Object)
], Article.prototype, "author", void 0);
__decorate([
    graphql_1.Field(),
    __metadata("design:type", String)
], Article.prototype, "createdAt", void 0);
__decorate([
    graphql_1.Field(),
    __metadata("design:type", String)
], Article.prototype, "updatedAt", void 0);
__decorate([
    graphql_1.Field(() => [Article_1], { nullable: true }),
    __metadata("design:type", Array)
], Article.prototype, "series", void 0);
__decorate([
    graphql_1.Field({ nullable: true }),
    typegoose_1.prop(),
    __metadata("design:type", String)
], Article.prototype, "seriesName", void 0);
__decorate([
    graphql_1.Field(),
    __metadata("design:type", String)
], Article.prototype, "url", void 0);
Article = Article_1 = __decorate([
    graphql_1.ObjectType(),
    typegoose_1.modelOptions({
        schemaOptions: {
            timestamps: true,
            toJSON: { virtuals: true },
            toObject: { virtuals: true },
        },
    }),
    typegoose_1.plugin(mongoosePopulate),
    typegoose_1.pre('save', function (next) {
        this.slug = slugify_1.slugify(this.title, true);
        next();
    })
], Article);
exports.Article = Article;
//# sourceMappingURL=article.type.js.map