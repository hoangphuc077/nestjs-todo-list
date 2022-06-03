import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import 'dotenv/config'
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 3000;

  const config = new DocumentBuilder()
  .setTitle('hexbase')
  .setDescription('The hexbase API description')
  .setVersion('1.0')
  .addTag('hexbase')
  .build();
const document = SwaggerModule.createDocument(app, config);
SwaggerModule.setup('api', app, document);

  await app.listen(port);
  Logger.log(`Server started at ${port}`);
}
bootstrap();
