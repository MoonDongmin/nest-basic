import {
  createParamDecorator,
  ExecutionContext,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersModule } from '../users.module';

export const User: any = createParamDecorator(
  (data: keyof UsersModule | undefined, context: ExecutionContext) => {
    const req = context.switchToHttp().getRequest();

    const user = req.user as UsersModule;

    if (!user) {
      throw new InternalServerErrorException(
        'Request에 user 프로퍼티가 존재하지 않습니다.',
      );
    }

    if (data) {
      return user[data];
    }
    return user;
  },
);
