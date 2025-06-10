import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorator/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    /**
     * Roles annotation에 대한 metadata를 가져와야 함.
     *
     * Reflector
     * getAllAndOverride(): ROLES_KEY에 대한 정보를 다 들고옴, 그 중에서 가장 가까운 값을 들고와서 override 해줌
     */
    const requiredRole = this.reflector.getAllAndOverride(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    // Roles Annotation 등록 안돼있음
    if (!requiredRole) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();

    if (!user) {
      throw new UnauthorizedException(`토큰을 제공해주세요`);
    }

    if (user.role !== requiredRole) {
      throw new ForbiddenException(
        `이 작업을 수행할 작업이 없습니다. ${requiredRole} 권한이 필요합니다.`,
      );
    }

    return true;
  }
}
