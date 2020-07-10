import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypegooseModule } from 'nestjs-typegoose';
// import { RoleModule } from 'src/role/role.module';
import { User } from './users.type';
import { UserResolver } from './users.resolver';
import { ArticleModule } from 'src/article/article.module';

@Module({
  imports: [TypegooseModule.forFeature([User]), ArticleModule],
  providers: [UsersService, UserResolver],
  exports: [UsersService],
})
export class UsersModule {}
