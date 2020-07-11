"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AUTH_DOMAIN = void 0;
const graphql_1 = require("@nestjs/graphql");
var AUTH_DOMAIN;
(function (AUTH_DOMAIN) {
    AUTH_DOMAIN["ADMIN"] = "ADMIN";
    AUTH_DOMAIN["USER"] = "USER";
})(AUTH_DOMAIN = exports.AUTH_DOMAIN || (exports.AUTH_DOMAIN = {}));
graphql_1.registerEnumType(AUTH_DOMAIN, {
    name: 'AUTH_DOMAIN',
});
//# sourceMappingURL=session.types.js.map