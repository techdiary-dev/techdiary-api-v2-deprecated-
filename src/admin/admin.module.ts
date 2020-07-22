import { Module, forwardRef } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { AdminService } from './admin.service';
import { Admin } from './admin.type';
import { AdminResolver } from './admin.resolver';

import { UsersModule } from 'src/users/users.module';
import { SessionModule } from 'src/session/session.module';

@Module({
  imports: [
    TypegooseModule.forFeature([Admin]),
    UsersModule,
    forwardRef(() => SessionModule),
  ],
  providers: [AdminService, AdminResolver],
  exports: [AdminService],
})
export class AdminModule {}
