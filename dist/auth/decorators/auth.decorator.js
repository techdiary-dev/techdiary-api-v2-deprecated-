"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Auth = void 0;
const common_1 = require("@nestjs/common");
const session_types_1 = require("../../session/session.types");
const swagger_1 = require("@nestjs/swagger");
const auth_guard_1 = require("../auth.guard");
exports.Auth = (...domains) => {
    return common_1.applyDecorators(common_1.SetMetadata('domains', domains), common_1.UseGuards(auth_guard_1.GqlJWTAuthGuard, auth_guard_1.RoleGuard), swagger_1.ApiBearerAuth());
};
//# sourceMappingURL=auth.decorator.js.map