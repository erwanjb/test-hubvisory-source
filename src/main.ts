import { NestFactory } from '@nestjs/core';
import { AppModule } from './server/app.module';
import * as session from 'express-session';
import { SESSION_SECRET } from './server/config/secrets';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
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
