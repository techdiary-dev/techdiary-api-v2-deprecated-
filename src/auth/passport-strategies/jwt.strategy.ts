import { Strategy, ExtractJwt } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JWTPayload } from 'src/session/session.type';
import { SessionService } from 'src/session/session.service';
import { Request } from 'express';

@Injectable()
export class JWTStrategy extends PassportStrategy(Strategy) {
  constructor(
    configService: ConfigService,
    private readonly sessionService: SessionService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        ExtractJwt.fromAuthHeaderAsBearerToken(),
        (req: Request) => req?.cookies?.token,
      ]),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }

  async validate(payload: JWTPayload): Promise<any> {
    const { sub, domain } = payload;

    const session = await this.sessionService.getSession(sub, domain);

    if (!session) {
      throw new HttpException(
        'Invalid or deleted token. Login to get new token',
        HttpStatus.FORBIDDEN,
      );
    }
    return session;
  }
}
