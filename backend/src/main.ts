import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Validate + transform every incoming request body
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,             // strip unknown fields silently
    forbidNonWhitelisted: true,  // throw 400 on unknown fields
    transform: true,             // cast "4" → 4, "true" → true automatically
  }));

  // Allow the Next.js dev server (and prod domain) to call the API
  app.enableCors({
    origin: process.env.FRONTEND_URL ?? 'http://localhost:3000',
  });

  // Auto-generate Swagger docs from decorators  →  /api
  const cfg = new DocumentBuilder()
    .setTitle('CloudOps Manager API')
    .setDescription('Central API for cloud projects, servers, monitoring and alerts')
    .setVersion('1.0')
    .addBearerAuth()          // JWT header — wired in Week 3
    .build();
  SwaggerModule.setup('api', app, SwaggerModule.createDocument(app, cfg));

  await app.listen(process.env.PORT ?? 3001);
  console.log('🚀  API     → http://localhost:3001');
  console.log('📄  Swagger → http://localhost:3001/api');
}
bootstrap();