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
exports.UpdateAdminInput = exports.CreateAdminInput = void 0;
const class_validator_1 = require("class-validator");
const graphql_1 = require("@nestjs/graphql");
let CreateAdminInput = class CreateAdminInput {
};
__decorate([
    graphql_1.Field(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], CreateAdminInput.prototype, "name", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    graphql_1.Field(),
    __metadata("design:type", String)
], CreateAdminInput.prototype, "username", void 0);
__decorate([
    graphql_1.Field(),
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsEmail({}, { message: 'Invalid email address' }),
    __metadata("design:type", String)
], CreateAdminInput.prototype, "email", void 0);
__decorate([
    graphql_1.Field(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], CreateAdminInput.prototype, "password", void 0);
CreateAdminInput = __decorate([
    graphql_1.InputType()
], CreateAdminInput);
exports.CreateAdminInput = CreateAdminInput;
let UpdateAdminInput = class UpdateAdminInput extends graphql_1.PartialType(CreateAdminInput) {
};
UpdateAdminInput = __decorate([
    graphql_1.InputType()
], UpdateAdminInput);
exports.UpdateAdminInput = UpdateAdminInput;
//# sourceMappingURL=admin.input.js.map