import { AUTH_DOMAIN } from 'src/session/session.types';
export declare const Auth: (...domains: AUTH_DOMAIN[]) => <TFunction extends Function, Y>(target: object | TFunction, propertyKey?: string | symbol, descriptor?: TypedPropertyDescriptor<Y>) => void;
