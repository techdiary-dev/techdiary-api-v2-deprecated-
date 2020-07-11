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
exports.updateArticleArgs = exports.updateArticleInput = exports.CreateArticleInput = exports.ArticlePayload = exports.idOrSlugArg = void 0;
const graphql_1 = require("@nestjs/graphql");
const article_type_1 = require("./article.type");
const class_validator_1 = require("class-validator");
const mongoose_1 = require("mongoose");
let idOrSlugArg = class idOrSlugArg {
};
__decorate([
    graphql_1.Field(() => graphql_1.ID, { nullable: true }),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], idOrSlugArg.prototype, "_id", void 0);
__decorate([
    graphql_1.Field({ nullable: true }),
    __metadata("design:type", String)
], idOrSlugArg.prototype, "slug", void 0);
idOrSlugArg = __decorate([
    graphql_1.InputType()
], idOrSlugArg);
exports.idOrSlugArg = idOrSlugArg;
let ArticlePayload = class ArticlePayload {
};
__decorate([
    graphql_1.Field(() => graphql_1.Int),
    __metadata("design:type", Number)
], ArticlePayload.prototype, "resourceCount", void 0);
__decorate([
    graphql_1.Field(() => graphql_1.Int),
    __metadata("design:type", Number)
], ArticlePayload.prototype, "pageCount", void 0);
__decorate([
    graphql_1.Field(() => graphql_1.Int),
    __metadata("design:type", Number)
], ArticlePayload.prototype, "currentPage", void 0);
__decorate([
    graphql_1.Field(() => [article_type_1.Article]),
    __metadata("design:type", Array)
], ArticlePayload.prototype, "data", void 0);
ArticlePayload = __decorate([
    graphql_1.ObjectType()
], ArticlePayload);
exports.ArticlePayload = ArticlePayload;
let CreateArticleInput = class CreateArticleInput {
};
__decorate([
    graphql_1.Field({ nullable: true }),
    class_validator_1.IsNotEmpty({ message: 'টাইটেল দিতেই হবে' }),
    class_validator_1.MinLength(10, { message: 'টাইটেল এ কমপক্ষে ১০ টি অক্ষর থাকতে হবে' }),
    __metadata("design:type", String)
], CreateArticleInput.prototype, "title", void 0);
__decorate([
    graphql_1.Field({ nullable: true }),
    class_validator_1.MinLength(100, { message: 'ডায়েরিতে এ কমপক্ষে ১০০ টি অক্ষর থাকতে হবে' }),
    __metadata("design:type", String)
], CreateArticleInput.prototype, "body", void 0);
__decorate([
    graphql_1.Field(),
    __metadata("design:type", Boolean)
], CreateArticleInput.prototype, "isPublished", void 0);
__decorate([
    graphql_1.Field({ nullable: true }),
    __metadata("design:type", String)
], CreateArticleInput.prototype, "thumbnail", void 0);
__decorate([
    graphql_1.Field(() => [String], { nullable: true }),
    class_validator_1.IsDefined({ message: 'কমপক্ষে একটি ট্যাগ দিতেই হবে' }),
    class_validator_1.IsNotEmpty({ message: 'কমপক্ষে একটি ট্যাগ দিতেই হবে' }),
    __metadata("design:type", Array)
], CreateArticleInput.prototype, "tags", void 0);
__decorate([
    graphql_1.Field(() => String, { nullable: true }),
    __metadata("design:type", String)
], CreateArticleInput.prototype, "seriesName", void 0);
CreateArticleInput = __decorate([
    graphql_1.InputType()
], CreateArticleInput);
exports.CreateArticleInput = CreateArticleInput;
let updateArticleInput = class updateArticleInput {
};
__decorate([
    graphql_1.Field({ nullable: true }),
    class_validator_1.IsNotEmpty({ message: 'টাইটেল দিতেই হবে' }),
    class_validator_1.MinLength(10, { message: 'টাইটেল এ কমপক্ষে ১০ টি অক্ষর থাকতে হবে' }),
    __metadata("design:type", String)
], updateArticleInput.prototype, "title", void 0);
__decorate([
    graphql_1.Field({ nullable: true }),
    class_validator_1.MinLength(100, { message: 'ডায়েরিতে এ কমপক্ষে ১০০ টি অক্ষর থাকতে হবে' }),
    __metadata("design:type", String)
], updateArticleInput.prototype, "body", void 0);
__decorate([
    graphql_1.Field(() => [String], { nullable: true }),
    class_validator_1.IsDefined({ message: 'কমপক্ষে একটি ট্যাগ দিতেই হবে' }),
    class_validator_1.IsNotEmpty({ message: 'কমপক্ষে একটি ট্যাগ দিতেই হবে' }),
    __metadata("design:type", Array)
], updateArticleInput.prototype, "tags", void 0);
__decorate([
    graphql_1.Field({ nullable: true }),
    __metadata("design:type", String)
], updateArticleInput.prototype, "thumbnail", void 0);
__decorate([
    graphql_1.Field({ nullable: true }),
    __metadata("design:type", Boolean)
], updateArticleInput.prototype, "isPublished", void 0);
__decorate([
    graphql_1.Field(() => String, { nullable: true }),
    __metadata("design:type", String)
], updateArticleInput.prototype, "seriesName", void 0);
updateArticleInput = __decorate([
    graphql_1.InputType()
], updateArticleInput);
exports.updateArticleInput = updateArticleInput;
let updateArticleArgs = class updateArticleArgs {
};
__decorate([
    graphql_1.Field(() => updateArticleInput, { nullable: true }),
    __metadata("design:type", updateArticleInput)
], updateArticleArgs.prototype, "data", void 0);
__decorate([
    graphql_1.Field(() => graphql_1.ID),
    __metadata("design:type", String)
], updateArticleArgs.prototype, "_id", void 0);
updateArticleArgs = __decorate([
    graphql_1.ArgsType()
], updateArticleArgs);
exports.updateArticleArgs = updateArticleArgs;
//# sourceMappingURL=article.input.js.map