import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypegooseModule } from 'nestjs-typegoose';
import { GraphQLModule } from '@nestjs/graphql';
import { JwtModule } from '@nestjs/jwt';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminModule } from './admin/admin.module';
import { SessionModule } from './session/session.module';
import { AuthModule } from './auth/auth.module';

import { RoleModule } from './role/role.module';
import { UsersModule } from './users/users.module';
import { ArticleModule } from './article/article.module';

const config: ConfigService = new ConfigService();

@Module({
  imports: [
    GraphQLModule.forRoot({
      installSubscriptionHandlers: true,
      autoSchemaFile: 'techdiary.gql',
      path: '/',
      context: allre => {
        return { req: allre.req, res: allre.res };
      },
      engine: {
        reportSchema: true,
      },
      // cors: {
      //   credentials: true,
      //   origin: config.get('CLIENT_URL'),
      // },
      cors: false,
    }),
    //-------------
    ConfigModule.forRoot({ isGlobal: true }),
    {
      ...JwtModule.register({ secret: config.get('JWT_SECRET') }),
      global: true,
    },
    TypegooseModule.forRoot(config.get('DATABASE_URL'), {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    }),
    AdminModule,
    SessionModule,
    AuthModule,
    RoleModule,
    UsersModule,
    ArticleModule,
  ],
})
export class AppModule {}
