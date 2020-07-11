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
exports.AuthPayload = exports.UserLoginDTO = exports.LoginDTO = void 0;
const class_validator_1 = require("class-validator");
const session_types_1 = require("../session/session.types");
const graphql_1 = require("@nestjs/graphql");
let LoginDTO = class LoginDTO {
};
__decorate([
    graphql_1.Field(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], LoginDTO.prototype, "identifier", void 0);
__decorate([
    graphql_1.Field(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], LoginDTO.prototype, "password", void 0);
LoginDTO = __decorate([
    graphql_1.InputType()
], LoginDTO);
exports.LoginDTO = LoginDTO;
class UserLoginDTO extends LoginDTO {
}
exports.UserLoginDTO = UserLoginDTO;
let AuthPayload = class AuthPayload {
};
__decorate([
    graphql_1.Field(() => session_types_1.AUTH_DOMAIN),
    __metadata("design:type", String)
], AuthPayload.prototype, "domain", void 0);
__decorate([
    graphql_1.Field(),
    __metadata("design:type", String)
], AuthPayload.prototype, "token", void 0);
AuthPayload = __decorate([
    graphql_1.ObjectType()
], AuthPayload);
exports.AuthPayload = AuthPayload;
//# sourceMappingURL=auth.input.js.map