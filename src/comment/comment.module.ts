import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { TypegooseModule } from 'nestjs-typegoose';
import { Comment } from './comment.type';
import { ArticleModule } from 'src/article/article.module';
import { CommentResolver } from './comment.resolver';

@Module({
  imports: [TypegooseModule.forFeature([Comment]), ArticleModule],
  providers: [CommentService, CommentResolver],
})
export class CommentModule {}
