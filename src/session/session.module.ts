import { Module } from '@nestjs/common';
import { SessionService } from './session.service';
import { TypegooseModule } from 'nestjs-typegoose';
import { Session } from './session.model';
import { SessionResolver } from './session.resolver';
import { UsersModule } from 'src/users/users.module';
import { AdminModule } from 'src/admin/admin.module';

@Module({
  imports: [TypegooseModule.forFeature([Session]), AdminModule, UsersModule],
  providers: [SessionService, SessionResolver],
  exports: [SessionService],
})
export class SessionModule { }
