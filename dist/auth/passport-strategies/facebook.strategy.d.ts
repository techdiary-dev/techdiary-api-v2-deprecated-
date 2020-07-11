import { ConfigService } from '@nestjs/config';
import { SessionService } from 'src/session/session.service';
declare const FacebookStategy_base: new (...args: any[]) => any;
export declare class FacebookStategy extends FacebookStategy_base {
    private readonly sessionService;
    constructor(config: ConfigService, sessionService: SessionService);
    validate(accessToken: any, refreshToken: any, profile: any): Promise<any>;
}
export {};
