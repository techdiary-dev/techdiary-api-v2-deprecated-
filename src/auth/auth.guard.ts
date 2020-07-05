import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AUTH_DOMAIN } from 'src/session/session.types';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';
import { ExecutionContextHost } from '@nestjs/core/helpers/execution-context-host';
import { Observable } from 'rxjs';

@Injectable()
export class GqlJWTAuthGuard extends AuthGuard('jwt') {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const { req } = ctx.getContext();
    const bool = await super.canActivate(context);
    if (bool) {
      return true;
    } else {
      return false;
    }
    // return super.canActivate(new ExecutionContextHost([req]));
  }
  getRequest(context: ExecutionContext) {
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
      return true;
    } else {
      const hasRole = domains.includes(request.user.domain);
      if (hasRole) return true;
      else throw new ForbiddenException('Permission denied');
    }
  }
}
