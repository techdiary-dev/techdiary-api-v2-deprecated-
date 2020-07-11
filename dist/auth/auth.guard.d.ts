import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
declare const GqlJWTAuthGuard_base: import("@nestjs/passport").Type<import("@nestjs/passport").IAuthGuard>;
export declare class GqlJWTAuthGuard extends GqlJWTAuthGuard_base {
    canActivate(context: ExecutionContext): Promise<boolean>;
    getRequest(context: ExecutionContext): any;
}
export declare class RoleGuard implements CanActivate {
    private reflector;
    constructor(reflector: Reflector);
    canActivate(context: ExecutionContext): boolean | Promise<boolean>;
}
export {};
