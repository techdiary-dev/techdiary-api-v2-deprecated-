import { AUTH_DOMAIN } from 'src/session/session.types';
export declare class LoginDTO {
    identifier: string;
    password: string;
}
export declare class UserLoginDTO extends LoginDTO {
}
export declare class AuthPayload {
    domain: AUTH_DOMAIN;
    token: string;
}
