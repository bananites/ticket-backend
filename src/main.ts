import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Module } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const options = new DocumentBuilder()
  .setTitle('TicketSystem')
  .setVersion('1.0')
  .addServer('http://localhost:3000', 'Local environment')
  .addServer('http://production.com', 'Production')
  .addTag('TicketAPI')
  .build();
  

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-docs', app, document);

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
