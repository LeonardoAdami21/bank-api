import {
  BadRequestException,
  ConflictException,
  forwardRef,
  Inject,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Users } from '@prisma/client';
import * as argon from 'argon2';
import { UsersService } from '../users/users.service';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { JwtPayloadInterface } from '../jwt/jwt-payload.interface';
import { jwtSecret } from '../env/envoriment';
@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    if (user && (await argon.verify(user.password, password))) {
      delete user.password;
      return user;
    }
    return null;
  }

  async login(user: Users) {
    try {
      const verifyUser = await this.usersService.verifyUserActive(user.id);
      if (!verifyUser) {
        return {
          message: 'User is not active',
          data: null,
        };
      }
      const payload: JwtPayloadInterface = { id: user.id, email: user.email, profile: user.profile };
      const token = await this.jwtService.sign(payload, { secret: jwtSecret });
      return {
        message: 'Login successfully',
        data: {
          access_token: token,
        },
      };
    } catch (error) {
      return {
        message: 'Bad request',
        data: error,
      };
    }
  }

  async register(dto: RegisterAuthDto) {
    try {
      const { name, document, email, password } = dto;
      if (!name || !document || !email || !password) {
        throw new BadRequestException('All fields are required');
      }
      if (document.length !== 11 && document.length !== 14) {
        throw new ConflictException('Invalid document');
      }
      const user = await this.usersService.create(dto);
      return {
        message: 'User created successfully',
        data: user,
      };
    } catch (error) {
      return {
        message: 'User already exists',
        data: error,
      };
    }
  }
}
