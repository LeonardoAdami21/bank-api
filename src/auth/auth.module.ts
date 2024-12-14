import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { LocalStrategy } from '../strategy/local.strategy';
import { JwtStrategy } from '../strategy/jwt.strategy';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { PassportModule } from '@nestjs/passport';
import { jwtSecret } from '../env/envoriment';
import { ConfigModule } from '@nestjs/config';
import { UsersStrategy } from '../strategy/users.strategy';
import { UsersAuthGuard } from '../guards/users-auth.guard';

@Module({
  imports: [
    ConfigModule.forRoot({
      expandVariables: true,
    }),
    forwardRef(() => UsersModule),
    PassportModule,
    JwtModule.register({
      secret: jwtSecret,
      signOptions: {
        expiresIn: '1h',
      },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalStrategy,
    LocalAuthGuard,
    JwtStrategy,
    JwtAuthGuard,
    JwtService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
  exports: [
    AuthService,
    LocalStrategy,
    LocalAuthGuard,
    JwtStrategy,
    JwtAuthGuard,
  ],
})
export class AuthModule {}
