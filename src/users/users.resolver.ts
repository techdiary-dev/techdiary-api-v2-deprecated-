import {
  Resolver,
  ResolveField,
  Parent,
  Args,
  Info,
  Mutation,
} from '@nestjs/graphql';
import { User } from './users.type';
import AppContext, { PaginationInput, ResourceList } from 'src/shared/types';
import { Article } from 'src/article/article.type';
import { GraphQLResolveInfo } from 'graphql';
import { ArticleService } from 'src/article/article.service';
import { AUTH_DOMAIN } from 'src/session/session.type';
import { Types } from 'mongoose';
import { UpdateUserArgs } from './users.input';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { UsersService } from './users.service';

@Resolver(() => User)
export class UserResolver {
  constructor(
    private readonly articleService: ArticleService,
    private readonly userService: UsersService,
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

  @Auth(AUTH_DOMAIN.ADMIN)
  @Mutation(() => User)
  async updateUserByAdmin(
    @Args() { userId, data }: UpdateUserArgs,
  ): Promise<User> {
    return this.userService.update(userId, data);
  }
}
