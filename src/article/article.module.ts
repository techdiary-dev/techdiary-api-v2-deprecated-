import { Module } from '@nestjs/common';
import { ArticleService } from './article.service';
import { TypegooseModule } from 'nestjs-typegoose';
import { Article } from './article.type';

@Module({
  imports: [TypegooseModule.forFeature([Article])],
  providers: [ArticleService]
})
export class ArticleModule {}
