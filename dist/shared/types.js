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
exports.PaginationInput = exports.ResourceList = void 0;
const graphql_1 = require("@nestjs/graphql");
const session_types_1 = require("../session/session.types");
let ResourceList = class ResourceList {
};
ResourceList = __decorate([
    graphql_1.ObjectType()
], ResourceList);
exports.ResourceList = ResourceList;
let PaginationInput = class PaginationInput {
};
__decorate([
    graphql_1.Field(() => graphql_1.Int, { nullable: true }),
    __metadata("design:type", Number)
], PaginationInput.prototype, "limit", void 0);
__decorate([
    graphql_1.Field({ nullable: true }),
    __metadata("design:type", String)
], PaginationInput.prototype, "sort", void 0);
__decorate([
    graphql_1.Field(() => graphql_1.Int, { nullable: true }),
    __metadata("design:type", Number)
], PaginationInput.prototype, "page", void 0);
PaginationInput = __decorate([
    graphql_1.InputType()
], PaginationInput);
exports.PaginationInput = PaginationInput;
//# sourceMappingURL=types.js.map