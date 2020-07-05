import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypegooseModule } from 'nestjs-typegoose';
// import { RoleModule } from 'src/role/role.module';
import { User } from './users.type';

@Module({
  imports: [TypegooseModule.forFeature([User])],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
