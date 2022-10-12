import compression from '@fastify/compress';
import helmet from '@fastify/helmet';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ENV } from './common/config';
import { NestFactory } from '@nestjs/core';
import { setupSwagger } from './common/docs/docs.swagger';
import { ValidationPipe, Logger } from '@nestjs/common';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';

async function bootstrap() {
  const fastify = new FastifyAdapter({ logger: true });
  fastify.register(compression);
  fastify.register(helmet, {
    contentSecurityPolicy: {
      directives: {
        defaultSrc: [`'self'`],
        styleSrc: [`'self'`, `'unsafe-inline'`],
        imgSrc: [`'self'`, 'data:', 'validator.swagger.io'],
        scriptSrc: [`'self'`, `https: 'unsafe-inline'`],
      },
    },
  });
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    fastify,
    { bufferLogs: true, rawBody: true },
  );

  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));

  const config = app.get(ConfigService);
  const { version = 'v1', port = 3333 } = config.get('app');

  app.setGlobalPrefix(`api/${version}`);
  if (process.env.NODE_ENV !== ENV.PRODUCTION) {
    setupSwagger(app, version);
  }
  app.enableCors();

  await app.listen(port, '0.0.0.0');
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/api/${version}`,
  );
}

bootstrap();
