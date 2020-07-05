import { SetMetadata, applyDecorators, UseGuards } from '@nestjs/common';
import { AUTH_DOMAIN } from 'src/session/session.types';
import { ApiBearerAuth } from '@nestjs/swagger';
import { RoleGuard, GqlJWTAuthGuard } from '../auth.guard';

export const Auth = (...domains: AUTH_DOMAIN[]) => {
  return applyDecorators(
    SetMetadata('domains', domains),
    UseGuards(GqlJWTAuthGuard, RoleGuard),
    ApiBearerAuth(),
  );
};
