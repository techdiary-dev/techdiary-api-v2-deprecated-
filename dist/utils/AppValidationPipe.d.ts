import { ValidationPipe } from '@nestjs/common';
import { ValidationError } from 'class-validator';
export declare class AppValidationPipe extends ValidationPipe {
    private amaderErrorFormatter;
    createExceptionFactory(): (validationErrors?: ValidationError[]) => unknown;
}
