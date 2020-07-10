import { Module } from '@nestjs/common';
import { ArticleService } from './article.service';
import { TypegooseModule } from 'nestjs-typegoose';
import { Article } from './article.type';
import { ArticleResolver } from './article.resolver';

@Module({
  imports: [TypegooseModule.forFeature([Article])],
  providers: [ArticleService, ArticleResolver],
  exports: [ArticleService],
})
export class ArticleModule {}
