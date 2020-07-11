import { User } from './users.type';
import { PaginationInput, ResourceList } from 'src/shared/types';
import { Article } from 'src/article/article.type';
import { UsersService } from './users.service';
import { GraphQLResolveInfo } from 'graphql';
import { ArticleService } from 'src/article/article.service';
export declare class UserResolver {
    private readonly userService;
    private readonly articleService;
    constructor(userService: UsersService, articleService: ArticleService);
    articles(author: User, pagination: PaginationInput, info: GraphQLResolveInfo): Promise<ResourceList<Article>>;
}
