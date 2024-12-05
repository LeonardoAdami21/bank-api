import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { JwtPayloadInterface } from 'src/jwt/jwt-payload.interface';
import { jwtSecret } from '../env/envoriment';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtSecret
    });
  }

  async validate(payload: JwtPayloadInterface): Promise<JwtPayloadInterface> {
    return {
      id: payload.id,
      email: payload.email,
      profile: payload.profile,
    };
  }
}
