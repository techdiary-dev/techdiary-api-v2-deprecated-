import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppValidationPipe } from './utils/AppValidationPipe';
import { ConfigService } from '@nestjs/config';

import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new AppValidationPipe());

  const options = new DocumentBuilder()
    .setTitle('Tittle API')
    .setDescription('Tittle API documentation')
    .setVersion('1.0.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-documentation', app, document);

  const config = app.get(ConfigService);
  const port = config.get<string>('PORT');
  await app.listen(port || 3000);

  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
