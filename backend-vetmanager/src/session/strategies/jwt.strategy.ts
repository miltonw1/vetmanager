
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'CHUCKNORRIS',
    });
  }

  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
async  validate(payload: any) {
    return { userId: payload.sub, username: payload.username };
  }
}