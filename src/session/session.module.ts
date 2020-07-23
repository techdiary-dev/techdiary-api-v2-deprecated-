import { Module, forwardRef } from '@nestjs/common';
import { SessionService } from './session.service';
import { TypegooseModule } from 'nestjs-typegoose';

import { SessionResolver } from './session.resolver';
import { UsersModule } from 'src/users/users.module';
import { AdminModule } from 'src/admin/admin.module';
import { Session } from './session.type';

@Module({
  imports: [
    TypegooseModule.forFeature([Session]),
    UsersModule,
    forwardRef(() => AdminModule),
  ],
  providers: [SessionService, SessionResolver],
  exports: [SessionService],
})
export class SessionModule {}
