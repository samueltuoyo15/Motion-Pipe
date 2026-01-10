import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { Logger } from '@nestjs/common';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { rawBody: true });
  app.use(helmet());
  app.enableCors({
    origin: process.env.ALLOWED_ORIGINS
      ? process.env.ALLOWED_ORIGINS.split(',')
      : [],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeader: ['Content-Type', 'Authorization'],
    exposedHeaders: ['set-cookie'],
  });
  app.use(cookieParser());
  app.setGlobalPrefix('api/v1');

  const config = new DocumentBuilder()
    .setTitle('Motion Pipe Tool API')
    .setDescription('API description')
    .setVersion('1.0')
    .addServer(process.env.BACKEND_DOMAIN!)
    .addCookieAuth('access_token')
    .addCookieAuth('refresh_token')
    .addBearerAuth({
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
    })
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/docs', app, document, {
    jsonDocumntUrl: 'docs/json',
    SwaggerOptions: {
      withCredentials: true,
    },
  });

  app.useLogger(new Logger('Main', { timestamp: true }));
  await app.listen(process.env.PORT ?? 3000);
}

bootstrap().catch((error) => {
  Logger.error('Error during bootstrap:', error);
  process.exit(1);
});
