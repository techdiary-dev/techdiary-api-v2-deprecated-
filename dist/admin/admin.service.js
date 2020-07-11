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
exports.AdminService = void 0;
const common_1 = require("@nestjs/common");
const nestjs_typegoose_1 = require("nestjs-typegoose");
const quick_crud_1 = require("quick-crud");
const admin_type_1 = require("./admin.type");
let AdminService = class AdminService {
    constructor(model) {
        this.model = model;
    }
    async create(data) {
        return quick_crud_1.store({ model: this.model, data });
    }
    async getById(_id) {
        return quick_crud_1.show({ model: this.model, where: { _id } });
    }
    async getByUsername(username) {
        return quick_crud_1.show({ model: this.model, where: { username } });
    }
    async getByEmail(email) {
        return quick_crud_1.show({ model: this.model, where: { email } });
    }
    async getByIdentifier(identifier) {
        const admin = await this.model.findOne({
            $or: [{ username: identifier }, { email: identifier }],
        });
        return admin;
    }
    async update(_id, data) {
        return this.model.findOneAndUpdate({ _id }, Object.assign({}, data), { new: true });
    }
    async count() {
        return this.model.countDocuments({});
    }
};
AdminService = __decorate([
    common_1.Injectable(),
    __param(0, nestjs_typegoose_1.InjectModel(admin_type_1.Admin)),
    __metadata("design:paramtypes", [Object])
], AdminService);
exports.AdminService = AdminService;
//# sourceMappingURL=admin.service.js.map