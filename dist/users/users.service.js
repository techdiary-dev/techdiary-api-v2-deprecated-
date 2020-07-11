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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const nestjs_typegoose_1 = require("nestjs-typegoose");
const users_type_1 = require("./users.type");
let UsersService = class UsersService {
    constructor(model) {
        this.model = model;
    }
    async findOrCreateUser(data) {
        const existsed = await this.getByGithubUID(data.githubUID);
        if (existsed) {
            return existsed;
        }
        else {
            return this.createUser(data);
        }
    }
    async createUser(data) {
        const user = await this.model.create(Object.assign({}, data));
        return user;
    }
    async getById(_id) {
        return this.model.findOne({ _id });
    }
    async getByUsername(username) {
        return this.model.findOne({
            username: { $regex: new RegExp('^' + username.toLowerCase(), 'i') },
        });
    }
    async update(_id, data) {
        console.log('userserviceUpdate', data);
        return this.model.findOneAndUpdate({ _id }, data, { new: true });
    }
    async getByGithubUID(code) {
        return this.model.findOne({ githubUID: code });
    }
};
UsersService = __decorate([
    common_1.Injectable(),
    __param(0, nestjs_typegoose_1.InjectModel(users_type_1.User)),
    __metadata("design:paramtypes", [Object])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map