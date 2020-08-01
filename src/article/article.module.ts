import { Module, forwardRef } from '@nestjs/common';
import { ArticleService } from './article.service';
import { TypegooseModule } from 'nestjs-typegoose';
import { Article } from './article.type';
import { ArticleResolver } from './article.resolver';
import { CommentModule } from 'src/comment/comment.module';
import { InteractionModule } from 'src/interaction/interaction.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
      }),
    }),
    TypegooseModule.forFeature([Article]),
    forwardRef(() => CommentModule),
    forwardRef(() => InteractionModule),
  ],
  providers: [ArticleService, ArticleResolver],
  exports: [ArticleService],
})
export class ArticleModule {}
