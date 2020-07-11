"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiPaginationQuery = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
exports.ApiPaginationQuery = () => {
    return common_1.applyDecorators(swagger_1.ApiQuery({
        name: 'page',
        required: false,
    }), swagger_1.ApiQuery({
        name: 'limit',
        required: false,
        description: 'Default: 10',
    }), swagger_1.ApiQuery({ name: 'sort', required: false }));
};
//# sourceMappingURL=api-pagination.decorator.js.map