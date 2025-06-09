import { RolesEnum } from '../const/roles.const';
import { SetMetadata } from '@nestjs/common';

export const ROLES_KEY = 'user_roles';

// @Roles(RolesEnum.ADMIN)
export const Roles = (role: RolesEnum) => SetMetadata(ROLES_KEY, role);
// -> Metadata 내의 'ROLES_KEY' 값의 키가 존재하고, 그 중 roles중 RolesEnum의 값을 가진 경우에만 controller를 통과할 수 있음
