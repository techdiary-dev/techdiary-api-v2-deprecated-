import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { AdminService } from './admin.service';
import { Admin } from './admin.type';
import { AdminResolver } from './admin.resolver';

import { SessionModule } from 'src/session/session.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [TypegooseModule.forFeature([Admin]), SessionModule, UsersModule],
  providers: [AdminService, AdminResolver],
  exports: [AdminService],
})
export class AdminModule { }
