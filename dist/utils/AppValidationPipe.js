"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppValidationPipe = void 0;
const common_1 = require("@nestjs/common");
const http_error_by_code_util_1 = require("@nestjs/common/utils/http-error-by-code.util");
class AppValidationPipe extends common_1.ValidationPipe {
    amaderErrorFormatter(arr) {
        const error = {};
        arr.map((errObj) => {
            error[errObj['property']] = Object.keys(errObj['constraints'])
                .map(constrains => `${errObj['constraints'][constrains]}`)
                .join('.');
        });
        return {
            errors: error,
            statusCode: this.errorHttpStatusCode,
        };
    }
    createExceptionFactory() {
        return (validationErrors = []) => {
            if (this.isDetailedOutputDisabled) {
                return new http_error_by_code_util_1.HttpErrorByCode[this.errorHttpStatusCode]();
            }
            const errors = this.amaderErrorFormatter(validationErrors);
            return new http_error_by_code_util_1.HttpErrorByCode[this.errorHttpStatusCode](errors);
        };
    }
}
exports.AppValidationPipe = AppValidationPipe;
//# sourceMappingURL=AppValidationPipe.js.map