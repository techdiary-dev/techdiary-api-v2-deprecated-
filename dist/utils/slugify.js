"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.slugify = void 0;
const crypto_1 = require("crypto");
exports.slugify = (str, unique = false) => {
    if (!str)
        return;
    let key = '';
    if (unique)
        key = '-' + crypto_1.randomBytes(3).toString('hex');
    return (str
        .toLowerCase()
        .trim()
        .split(' ')
        .join('-')
        .replace(/[.*+?^${}()|[\]\\]/g, '-')
        .replace(/--/g, '-') + key);
};
//# sourceMappingURL=slugify.js.map