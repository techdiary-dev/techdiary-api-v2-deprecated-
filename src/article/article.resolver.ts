import {
  Resolver,
  Args,
  Query,
  Mutation,
  Context,
  ResolveField,
  Parent,
  ID,
} from '@nestjs/graphql';
import { Article } from './article.type';
import {
  ArticlePayload,
  idOrSlugArg,
  CreateArticleInput,
  updateArticleArgs,
} from './article.input';
import AppContext, { PaginationInput, ResourceList } from 'src/shared/types';
import { ArticleService } from './article.service';
import { DocumentType } from '@typegoose/typegoose';
import { Types } from 'mongoose';
import { Auth } from 'src/auth/decorators/auth.decorator';

@Resolver(() => Article)
export class ArticleResolver {
  constructor(private readonly articleService: ArticleService) {}

  @Query(() => ArticlePayload)
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

  @Query(() => ArticlePayload)
  async articlesByTag(
    @Args('tag') tag: string,
    @Args('pagination', { nullable: true }) paginationOptions: PaginationInput,
  ) {
    return this.articleService.ArticlesByTag(tag, paginationOptions);
  }

  @Mutation(() => Article)
  @Auth()
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
    console.log('updateArtilce', JSON.stringify(data), _id);
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
    // @ts-ignore
    return `/${parent.author?.username}/${parent.slug}`;
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
}
