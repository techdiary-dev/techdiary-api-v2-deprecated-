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
exports.RoleService = void 0;
const common_1 = require("@nestjs/common");
const nestjs_typegoose_1 = require("nestjs-typegoose");
const config_1 = require("@nestjs/config");
const role_model_1 = require("./role.model");
const quick_crud_1 = require("quick-crud");
const types_1 = require("../shared/types");
const role_type_1 = require("./role.type");
let RoleService = class RoleService {
    constructor(model, config) {
        this.model = model;
        this.config = config;
    }
    async roleList(query) {
        return quick_crud_1.index({ model: this.model, paginationOptions: query });
    }
    async createRole(data) {
        return quick_crud_1.store({ model: this.model, data });
    }
    async getRoleByName(name) {
        return quick_crud_1.show({ model: this.model, where: { name } });
    }
    async createDefaultRole() {
        const role = await this.model.create({
            name: 'USER',
            permissions: [...Object.values(role_type_1.Permissions)],
        });
        return role;
    }
};
RoleService = __decorate([
    common_1.Injectable(),
    __param(0, nestjs_typegoose_1.InjectModel(role_model_1.Role)),
    __metadata("design:paramtypes", [Object, config_1.ConfigService])
], RoleService);
exports.RoleService = RoleService;
//# sourceMappingURL=role.service.js.map