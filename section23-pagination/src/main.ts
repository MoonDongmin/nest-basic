import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      // query에 실제로 값을 넣은 적이 없다면 원래 그대로 반환을 해줘야 하는데,
      // 이를 설정해주면 값을 넣지 않아도 DTO에 넣은 값을 넣은 채로 해줌
      transform: true,
    }),
  );
  await app.listen(3000);
}

bootstrap();
