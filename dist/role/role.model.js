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
exports.Role = void 0;
const typegoose_1 = require("@typegoose/typegoose");
const uniqueValidator = require("mongoose-unique-validator");
const role_type_1 = require("./role.type");
let Role = class Role {
};
__decorate([
    typegoose_1.prop({ required: true, unique: true }),
    __metadata("design:type", String)
], Role.prototype, "name", void 0);
__decorate([
    typegoose_1.prop({
        type: String,
        enum: Object.values(role_type_1.Permissions),
        required: true,
    }),
    __metadata("design:type", Array)
], Role.prototype, "permissions", void 0);
Role = __decorate([
    typegoose_1.plugin(uniqueValidator, { message: '{VALUE} already taken' })
], Role);
exports.Role = Role;
//# sourceMappingURL=role.model.js.map