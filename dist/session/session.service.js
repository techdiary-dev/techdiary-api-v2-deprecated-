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
exports.SessionService = void 0;
const common_1 = require("@nestjs/common");
const nestjs_typegoose_1 = require("nestjs-typegoose");
const session_model_1 = require("./session.model");
const quick_crud_1 = require("quick-crud");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
let SessionService = class SessionService {
    constructor(model, config, jwtService) {
        this.model = model;
        this.config = config;
        this.jwtService = jwtService;
    }
    async findOrCreateSession(sub, domain) {
        const session = await this.model.findOne({ sub, domain });
        if (!session) {
            const newSession = await this.createSession(sub, domain);
            return newSession;
        }
        return session;
    }
    async getSession(sub, domain) {
        const session = await this.model.findOne({ sub, domain });
        return session;
    }
    async createSession(sub, domain) {
        const token = await this.generateToken(sub, domain);
        const session = await quick_crud_1.store({
            model: this.model,
            data: { sub, domain, token },
        });
        return session;
    }
    generateToken(sub, domain) {
        const payload = {
            iss: this.config.get('APP_NAME'),
            sub,
            domain,
        };
        return this.jwtService.signAsync(payload);
    }
    async deleteSession(sub, domain) {
        const deleted = await this.model.findOneAndDelete({ sub, domain });
        if (!deleted)
            return false;
        return true;
    }
};
SessionService = __decorate([
    common_1.Injectable(),
    __param(0, nestjs_typegoose_1.InjectModel(session_model_1.Session)),
    __metadata("design:paramtypes", [Object, config_1.ConfigService,
        jwt_1.JwtService])
], SessionService);
exports.SessionService = SessionService;
//# sourceMappingURL=session.service.js.map