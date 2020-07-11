import { ArgumentsHost, ExceptionFilter } from '@nestjs/common';
import { Error } from 'mongoose';
export declare class MongoExceptionFilter implements ExceptionFilter {
    catch(exception: Error.ValidationError, host: ArgumentsHost): any;
}
