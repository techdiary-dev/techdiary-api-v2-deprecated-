import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppValidationPipe } from './utils/AppValidationPipe';
import { ConfigService } from '@nestjs/config';
import * as CookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new AppValidationPipe());
  const config = app.get(ConfigService);
  app.use(CookieParser(config.get('JWT_SECRET')));
  app.enableCors({ credentials: true, origin: config.get('CLIENT_URL') });
  const port = config.get<string>('PORT');
  await app.listen(port || 3000);

  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
