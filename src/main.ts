import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.useGlobalPipes(
  //   new ValidationPipe({ whitelist: true})
  // )
  const options = new DocumentBuilder()
  .setTitle('TicketSystem')
  .setVersion('1.0')
  .addServer('http://localhost:3000', 'Local environment')
  .addServer('http://production.com', 'Production')
  .addTag('TicketAPI')
  .build();

  app.setGlobalPrefix('api/v1');

  

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT);
}
bootstrap();
