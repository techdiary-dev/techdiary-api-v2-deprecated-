"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const AppValidationPipe_1 = require("./utils/AppValidationPipe");
const config_1 = require("@nestjs/config");
const CookieParser = require("cookie-parser");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalPipes(new AppValidationPipe_1.AppValidationPipe());
    const config = app.get(config_1.ConfigService);
    app.use(CookieParser(config.get('JWT_SECRET')));
    app.enableCors({ credentials: true, origin: config.get('CLIENT_URL') });
    const port = config.get('PORT');
    await app.listen(port || 3000);
    console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
//# sourceMappingURL=main.js.map