import { Module, forwardRef } from '@nestjs/common';
import { CommentService } from './comment.service';
import { TypegooseModule } from 'nestjs-typegoose';
import { Comment } from './comment.type';
import { ArticleModule } from 'src/article/article.module';
import { CommentResolver } from './comment.resolver';

@Module({
  imports: [
    TypegooseModule.forFeature([Comment]),
    forwardRef(() => ArticleModule),
  ],
  providers: [CommentService, CommentResolver],
  exports: [CommentService],
})
export class CommentModule {}
