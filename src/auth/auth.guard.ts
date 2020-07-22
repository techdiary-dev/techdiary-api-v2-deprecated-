import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AUTH_DOMAIN } from 'src/session/session.type';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class GqlJWTAuthGuard extends AuthGuard('jwt') {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const bool = await super.canActivate(context);
    if (bool) {
      return true;
    } else {
      return false;
    }
  }
  getRequest(context: ExecutionContext): any {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }
}

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const domains = this.reflector.get<AUTH_DOMAIN[]>(
      'domains',
      context.getHandler(),
    );
    const ctx = GqlExecutionContext.create(context);
    const request = ctx.getContext().req;

    if (!domains?.length) {
      return true; // when there is no domain needed
    } else {
      const hasRole = domains.includes(request.user.domain);
      if (hasRole) return true;
      else throw new ForbiddenException('Permission denied');
    }
  }
}
