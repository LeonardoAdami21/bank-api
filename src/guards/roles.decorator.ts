import { SetMetadata } from '@nestjs/common';
import { UserProfileEnum } from '../interface/user-profile.interface';

export const Roles = (...roles: UserProfileEnum[]) =>
  SetMetadata('roles', roles);
