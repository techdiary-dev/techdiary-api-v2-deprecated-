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
exports.User = void 0;
const typegoose_1 = require("@typegoose/typegoose");
const bcryptjs_1 = require("bcryptjs");
const uniqueValidator = require("mongoose-unique-validator");
const bcryptjs_2 = require("bcryptjs");
const role_model_1 = require("../role/role.model");
let User = class User {
    comparePassword(passwordText) {
        return bcryptjs_2.compare(passwordText, this.password);
    }
};
__decorate([
    typegoose_1.prop({ required: true }),
    __metadata("design:type", String)
], User.prototype, "name", void 0);
__decorate([
    typegoose_1.prop({ unique: true }),
    __metadata("design:type", String)
], User.prototype, "username", void 0);
__decorate([
    typegoose_1.prop({ unique: true }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    typegoose_1.prop({ minlength: 6 }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    typegoose_1.prop({ ref: role_model_1.Role }),
    __metadata("design:type", Object)
], User.prototype, "role", void 0);
User = __decorate([
    typegoose_1.plugin(uniqueValidator, { message: '{VALUE} already taken' }),
    typegoose_1.pre('save', function () {
        this.password = bcryptjs_1.hashSync(this.password);
    }),
    typegoose_1.pre(/^find/, function () {
        this.populate('role');
    }),
    typegoose_1.modelOptions({
        schemaOptions: {
            toJSON: { virtuals: true },
            toObject: { virtuals: true },
        },
    })
], User);
exports.User = User;
//# sourceMappingURL=users.model.js.map