import {
  Resolver,
  Args,
  Query,
  Mutation,
  Context,
  ResolveField,
  Parent,
  ID,
  ObjectType,
} from '@nestjs/graphql';
import * as readingTime from 'reading-time';
import { Article } from './article.type';
import {
  idOrSlugArg,
  CreateArticleInput,
  updateArticleArgs,
} from './article.input';
import AppContext, {
  PaginationInput,
  ResourceList,
  Pagination,
} from 'src/shared/types';
import { ArticleService } from './article.service';
import { DocumentType, isDocument } from '@typegoose/typegoose';
import { Types } from 'mongoose';
import { Auth } from 'src/auth/decorators/auth.decorator';

@ObjectType()
class ArticlePagination extends Pagination(Article) {}
@Resolver(() => Article)
export class ArticleResolver {
  constructor(private readonly articleService: ArticleService) {}

  @Query(() => ArticlePagination)
  async articles(
    @Args('pagination', { nullable: true }) paginationOptions: PaginationInput,
  ): Promise<ResourceList<Article>> {
    return this.articleService.getPublishedArticles(paginationOptions);
  }

  @Query(() => Article)
  async article(
    @Args('idOrSlug') idOrSlug: idOrSlugArg,
  ): Promise<DocumentType<Article>> {
    const article = await this.articleService.getArticleByIdOrSlug(idOrSlug);
    return article;
  }

  @Query(() => ArticlePagination)
  async articlesByTag(
    @Args('tags', { type: () => [String] }) tags: string[],
    @Args('and', { type: () => Boolean, nullable: true }) and: boolean,
    @Args('pagination', { nullable: true }) paginationOptions: PaginationInput,
  ): Promise<ResourceList<Article>> {
    return this.articleService.ArticlesByTag(tags, paginationOptions, and);
  }

  @Auth()
  @Mutation(() => Article)
  createArticle(
    @Args('data') data: CreateArticleInput,
    @Context() ctx: AppContext,
  ): Promise<Article> {
    return this.articleService.createArticle(data, ctx.req.user.sub);
  }

  @Mutation(() => Article)
  @Auth()
  updateArticle(
    @Args() { data, _id }: updateArticleArgs,
    @Context() ctx: AppContext,
  ): Promise<Article> {
    return this.articleService.updateArticle(
      data,
      Types.ObjectId(_id),
      ctx.req.user.sub,
      ctx.req.user.domain,
    );
  }

  @Mutation(() => Article)
  @Auth()
  deleteArticle(
    @Args('_id', { type: () => ID }) _id: string,
    @Context() ctx: AppContext,
  ): Promise<Article> {
    return this.articleService.deleteArticle(
      Types.ObjectId(_id),
      ctx.req.user.sub,
      ctx.req.user.domain,
    );
  }

  @ResolveField()
  url(@Parent() parent: Article): string {
    return `/${isDocument(parent.author) && parent.author.username}/${
      parent.slug
    }`;
  }

  @ResolveField()
  excerpt(
    @Parent() parent: Article,
    @Args('wordsCount', { nullable: true, defaultValue: 30 })
    wordsCount?: number,
  ): string {
    return parent.body
      .split(' ')
      .slice(0, wordsCount)
      .join(' ');
  }

  @ResolveField()
  series(@Parent() parent: Article): Promise<DocumentType<Article>[]> {
    return this.articleService.findSeriesArticles(parent);
  }

  @ResolveField()
  timeToRead(@Parent() parent: Article): number {
    return Math.ceil(readingTime(parent.body).minutes);
  }
}
