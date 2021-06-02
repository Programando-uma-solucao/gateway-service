import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

import { AppModule } from './app.module';
import { TimeoutInterceptor } from './interceptors/timeout.interceptor';

(async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new TimeoutInterceptor());
  await app.listen(8080, () =>
    console.log('gateway-service is listening on port 8081'),
  );
})();
