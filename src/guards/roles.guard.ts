import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { UserProfileEnum } from '../interface/user-profile.interface';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private jwtService: JwtService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<UserProfileEnum[]>(
      'roles',
      [context.getHandler(), context.getClass()],
    );

    if (!requiredRoles) return true;

    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.replace('Bearer ', '');

    if (!token) return false;

    const payload = (await this.jwtService.decode(token)) as any;

    const roles = payload.profile ? payload.profile : payload.user.profile;

    if (roles.includes(UserProfileEnum.ADMIN)) {
      return true;
    }

    if (requiredRoles.some((role) => roles?.includes(role))) {
      return true;
    }
    throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
  }
}
