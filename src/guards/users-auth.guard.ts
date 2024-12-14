import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthStrategiesEnum } from '../jwt/auth-strategies.enum';

@Injectable()
export class UsersAuthGuard extends AuthGuard(AuthStrategiesEnum.USERS) {}
