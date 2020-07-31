import { Module, forwardRef } from '@nestjs/common';
import { ArticleService } from './article.service';
import { TypegooseModule } from 'nestjs-typegoose';
import { Article } from './article.type';
import { ArticleResolver } from './article.resolver';
import { CommentModule } from 'src/comment/comment.module';

@Module({
  imports: [
    TypegooseModule.forFeature([Article]),
    forwardRef(() => CommentModule),
  ],
  providers: [ArticleService, ArticleResolver],
  exports: [ArticleService],
})
export class ArticleModule {}
