import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from '../user/user.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PayloadInterface } from './dtos/payload.interface';
import { EnvVariables } from '../config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private userService: UserService,
    private readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: (req) => {
        const lastWord = req?.originalUrl?.split('/').pop().substring(0, 3);
        if (lastWord === 'sse') {
          const token = req.query?.token;
          return token;
        }
        return ExtractJwt.fromAuthHeaderAsBearerToken()(req);
      },
      ignoreExpiration: false,
      secretOrKey: configService.get<string>(EnvVariables.ACCESS_TOKEN_SECRET),
    });
  }
  async validate(payload: PayloadInterface) {
    const user = await this.userService.findOne({ email: payload.email });

    if (!user) {
      throw new UnauthorizedException();
    }
    delete user.password;
    return user;
  }
}
