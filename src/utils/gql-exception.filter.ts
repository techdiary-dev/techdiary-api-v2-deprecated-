import { Catch, HttpException, ArgumentsHost } from '@nestjs/common';
import { GqlArgumentsHost, GqlExceptionFilter } from '@nestjs/graphql';
import AppContext from 'src/shared/types';

@Catch(HttpException)
export class HttpExceptionFilter implements GqlExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const hosted = GqlArgumentsHost.create(host);
    const ctx: AppContext = hosted.getContext();
    ctx.res.statusCode = exception.getStatus();
    if (!ctx.req?.user && exception.message.includes('token'))
      ctx.res.clearCookie('token');

    return exception;
  }
}
