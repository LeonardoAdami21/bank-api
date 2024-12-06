import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Users } from '@prisma/client';
import { AuthStrategiesEnum } from '../jwt/auth-strategies.enum';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class UserStrategy extends PassportStrategy(
  Strategy,
  AuthStrategiesEnum.USER,
) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'email',
      passwordField: 'password',
    });
  }

  async validate(email: string, password: string): Promise<Partial<Users>> {
    const user = await this.authService.validateUser(email, password);

    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
}
