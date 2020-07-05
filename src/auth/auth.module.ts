import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AdminModule } from 'src/admin/admin.module';
import { SessionModule } from 'src/session/session.module';
import { RoleModule } from 'src/role/role.module';
import { UsersModule } from 'src/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JWTStrategy } from './passport-strategies/jwt.strategy';
import { FacebookStategy } from './passport-strategies/facebook.strategy';
import { AuthResolver } from './auth.resolver';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
      }),
    }),
    AdminModule,
    UsersModule,
    SessionModule,
    RoleModule,
    PassportModule,
  ],
  providers: [AuthResolver, AuthService, JWTStrategy, FacebookStategy],
  exports: [AuthService],
})
export class AuthModule {}
