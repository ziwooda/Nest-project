import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      forbidNonWhitelisted: true,
      whitelist: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Modeset API')
    .setDescription('API info of Modeset Server')
    .setVersion('v0.1')
    .addTag('modeset')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.enableCors({
    // allowedHeaders: ['Accept', 'Content-Type'],
    origin: ['http://localhost:3001', 'http://localhost:3000'],
    methods: 'GET,POST,DELETE,PATCH',
    // preflightContinue: false,
    // optionsSuccessStatus: 204,
    // credentials: true,
  });
  await app.listen(3001);
}
bootstrap();
