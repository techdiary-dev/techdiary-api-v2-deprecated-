import { ConfigService } from '@nestjs/config';
import { JWTPayload } from 'src/session/session.types';
import { SessionService } from 'src/session/session.service';
declare const JWTStrategy_base: new (...args: any[]) => any;
export declare class JWTStrategy extends JWTStrategy_base {
    private readonly sessionService;
    constructor(configService: ConfigService, sessionService: SessionService);
    validate(payload: JWTPayload): Promise<any>;
}
export {};
