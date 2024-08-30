import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as session from 'express-session';
import { NestExpressApplication } from '@nestjs/platform-express';
import { configDotenv } from 'dotenv';
import { join } from 'path';

configDotenv();

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.use(
    session({
      secret: process.env.JWT_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        secure: false,
        expires: 10000 * 60 * 60 * 24,
      },
    }),
  );
  app.enableCors({ origin: 'http://localhost:3000', credentials: true });
  // app.use(serveStatic('public', {}));
  // somewhere in your initialization file
  app.useStaticAssets(join(__dirname, '..', 'public/public'));
  const config = new DocumentBuilder()
    .setTitle('Breeze Update Documentation')
    .setDescription('All your worries end here.')
    .setVersion('1.0')
    .addTag('Docs')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/doc', app, document);
  await app.listen(3001);
}
bootstrap();
