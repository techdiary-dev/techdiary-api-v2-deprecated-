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
exports.RoleGuard = exports.GqlJWTAuthGuard = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const session_types_1 = require("../session/session.types");
const graphql_1 = require("@nestjs/graphql");
const passport_1 = require("@nestjs/passport");
let GqlJWTAuthGuard = class GqlJWTAuthGuard extends passport_1.AuthGuard('jwt') {
    async canActivate(context) {
        const bool = await super.canActivate(context);
        if (bool) {
            return true;
        }
        else {
            return false;
        }
    }
    getRequest(context) {
        const ctx = graphql_1.GqlExecutionContext.create(context);
        return ctx.getContext().req;
    }
};
GqlJWTAuthGuard = __decorate([
    common_1.Injectable()
], GqlJWTAuthGuard);
exports.GqlJWTAuthGuard = GqlJWTAuthGuard;
let RoleGuard = class RoleGuard {
    constructor(reflector) {
        this.reflector = reflector;
    }
    canActivate(context) {
        const domains = this.reflector.get('domains', context.getHandler());
        const ctx = graphql_1.GqlExecutionContext.create(context);
        const request = ctx.getContext().req;
        if (!(domains === null || domains === void 0 ? void 0 : domains.length)) {
            return true;
        }
        else {
            const hasRole = domains.includes(request.user.domain);
            if (hasRole)
                return true;
            else
                throw new common_1.ForbiddenException('Permission denied');
        }
    }
};
RoleGuard = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [core_1.Reflector])
], RoleGuard);
exports.RoleGuard = RoleGuard;
//# sourceMappingURL=auth.guard.js.map