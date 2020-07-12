import { Resolver, ResolveField, Parent, Args, Info } from '@nestjs/graphql';
import { User } from './users.type';
import { PaginationInput, ResourceList } from 'src/shared/types';
import { Article } from 'src/article/article.type';
import { UsersService } from './users.service';
import { GraphQLResolveInfo } from 'graphql';
import { ArticleService } from 'src/article/article.service';
import { Types } from 'mongoose';

@Resolver(() => User)
export class UserResolver {
  constructor(
    private readonly userService: UsersService,
    private readonly articleService: ArticleService,
  ) {}
  @ResolveField(() => User)
  articles(
    @Parent() author: User,
    @Args('pagination', { nullable: true }) pagination: PaginationInput,
    @Info() info: GraphQLResolveInfo,
  ): Promise<ResourceList<Article>> {
    if (info.path.prev.key === 'me') {
      return this.articleService.getAuthorArticles(author._id, pagination);
    }
    return this.articleService.getAuthorArticles(author._id, pagination, true);
  }
}
