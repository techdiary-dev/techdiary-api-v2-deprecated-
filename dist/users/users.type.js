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
exports.User = exports.WorkInfo = exports.Link = void 0;
const typegoose_1 = require("@typegoose/typegoose");
const graphql_1 = require("@nestjs/graphql");
const article_input_1 = require("../article/article.input");
const mongoosePopulate = require("mongoose-autopopulate");
const mongoose_1 = require("mongoose");
let Link = class Link {
};
__decorate([
    typegoose_1.prop(),
    graphql_1.Field(),
    __metadata("design:type", String)
], Link.prototype, "text", void 0);
__decorate([
    typegoose_1.prop(),
    graphql_1.Field(),
    __metadata("design:type", String)
], Link.prototype, "link", void 0);
Link = __decorate([
    graphql_1.ObjectType('LinkType'),
    graphql_1.InputType('LinkInput')
], Link);
exports.Link = Link;
let WorkInfo = class WorkInfo {
};
__decorate([
    typegoose_1.prop(),
    graphql_1.Field(),
    __metadata("design:type", String)
], WorkInfo.prototype, "name", void 0);
__decorate([
    typegoose_1.prop(),
    graphql_1.Field(),
    __metadata("design:type", String)
], WorkInfo.prototype, "designation", void 0);
__decorate([
    typegoose_1.prop(),
    graphql_1.Field(),
    __metadata("design:type", String)
], WorkInfo.prototype, "startTime", void 0);
__decorate([
    typegoose_1.prop(),
    graphql_1.Field(),
    __metadata("design:type", String)
], WorkInfo.prototype, "endTime", void 0);
WorkInfo = __decorate([
    graphql_1.ObjectType('WorkInfo'),
    graphql_1.InputType('WorkInfoInput')
], WorkInfo);
exports.WorkInfo = WorkInfo;
let User = class User {
};
__decorate([
    graphql_1.Field(() => graphql_1.ID),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], User.prototype, "_id", void 0);
__decorate([
    graphql_1.Field(),
    typegoose_1.prop({ required: true }),
    __metadata("design:type", String)
], User.prototype, "name", void 0);
__decorate([
    graphql_1.Field(),
    typegoose_1.prop({ lowercase: true, unique: true, required: true }),
    __metadata("design:type", String)
], User.prototype, "username", void 0);
__decorate([
    graphql_1.Field({ nullable: true }),
    typegoose_1.prop({ unique: true }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    graphql_1.Field({ nullable: true }),
    typegoose_1.prop(),
    __metadata("design:type", String)
], User.prototype, "profilePhoto", void 0);
__decorate([
    graphql_1.Field(),
    typegoose_1.prop({ required: true }),
    __metadata("design:type", String)
], User.prototype, "githubUID", void 0);
__decorate([
    graphql_1.Field({ nullable: true }),
    typegoose_1.prop(),
    __metadata("design:type", String)
], User.prototype, "education", void 0);
__decorate([
    graphql_1.Field({ nullable: true }),
    typegoose_1.prop(),
    __metadata("design:type", String)
], User.prototype, "designation", void 0);
__decorate([
    graphql_1.Field({ nullable: true }),
    typegoose_1.prop(),
    __metadata("design:type", String)
], User.prototype, "location", void 0);
__decorate([
    graphql_1.Field({ nullable: true }),
    typegoose_1.prop(),
    __metadata("design:type", String)
], User.prototype, "bio", void 0);
__decorate([
    graphql_1.Field(() => [Link], { nullable: true }),
    typegoose_1.prop({ type: Link, _id: false }),
    __metadata("design:type", Array)
], User.prototype, "links", void 0);
__decorate([
    graphql_1.Field(() => [WorkInfo], { nullable: true }),
    typegoose_1.prop({ type: WorkInfo, _id: false }),
    __metadata("design:type", Array)
], User.prototype, "workInfo", void 0);
__decorate([
    graphql_1.Field(() => [String], { nullable: true }),
    typegoose_1.prop({ type: String }),
    __metadata("design:type", Array)
], User.prototype, "skills", void 0);
__decorate([
    graphql_1.Field(() => article_input_1.ArticlePayload, { nullable: true }),
    __metadata("design:type", article_input_1.ArticlePayload)
], User.prototype, "articles", void 0);
User = __decorate([
    graphql_1.ObjectType(),
    typegoose_1.plugin(mongoosePopulate)
], User);
exports.User = User;
//# sourceMappingURL=users.type.js.map