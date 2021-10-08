import { NestFactory } from '@nestjs/core';
import { AppModule } from './server/app.module';
import * as session from 'express-session';
import { SESSION_SECRET } from './server/config/secrets';
import * as history from 'connect-history-api-fallback';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(history());
  app.use(
    session({
      secret: SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
    }),
  );
  await app.listen(3000);
}
bootstrap();
