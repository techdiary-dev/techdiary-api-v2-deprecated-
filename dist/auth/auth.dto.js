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
exports.AuthPayload = exports.UserLoginDTO = exports.LoginDTO = exports.AdminRegisterDTO = void 0;
const class_validator_1 = require("class-validator");
const session_types_1 = require("../session/session.types");
const swagger_1 = require("@nestjs/swagger");
const graphql_1 = require("@nestjs/graphql");
let AdminRegisterDTO = class AdminRegisterDTO {
};
__decorate([
    graphql_1.Field(),
    swagger_1.ApiProperty({
        type: String,
        description: 'Admin username',
        required: true,
    }),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], AdminRegisterDTO.prototype, "name", void 0);
__decorate([
    graphql_1.Field(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], AdminRegisterDTO.prototype, "username", void 0);
__decorate([
    graphql_1.Field(),
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsEmail({}, { message: 'Invalid email address' }),
    __metadata("design:type", String)
], AdminRegisterDTO.prototype, "email", void 0);
__decorate([
    graphql_1.Field(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], AdminRegisterDTO.prototype, "password", void 0);
AdminRegisterDTO = __decorate([
    graphql_1.InputType()
], AdminRegisterDTO);
exports.AdminRegisterDTO = AdminRegisterDTO;
let LoginDTO = class LoginDTO {
};
__decorate([
    graphql_1.Field(),
    swagger_1.ApiProperty({
        type: String,
        description: 'username/email address',
        required: true,
    }),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], LoginDTO.prototype, "identifier", void 0);
__decorate([
    graphql_1.Field(),
    swagger_1.ApiProperty({
        type: String,
        description: 'password',
        required: true,
    }),
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
    graphql_1.Field(),
    __metadata("design:type", String)
], AuthPayload.prototype, "token", void 0);
AuthPayload = __decorate([
    graphql_1.ObjectType()
], AuthPayload);
exports.AuthPayload = AuthPayload;
//# sourceMappingURL=auth.dto.js.map