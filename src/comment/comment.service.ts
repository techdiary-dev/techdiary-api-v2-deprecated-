import { Injectable } from '@nestjs/common';
import { ArticleService } from 'src/article/article.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class CommentService {
  constructor(private readonly articleService: ArticleService) {}
}
