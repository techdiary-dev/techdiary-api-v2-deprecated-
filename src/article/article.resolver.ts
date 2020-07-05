import { Resolver, Args, Query } from '@nestjs/graphql';
import { Article } from './article.type';
import { ArticlePayload, idOrSlugArg } from './article.input';
import { PaginationInput, ResourceList } from 'src/shared/types';
import { ArticleService } from './article.service';
import { DocumentType } from '@typegoose/typegoose';
import { Types } from 'mongoose';

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

    // if (article.seriesName) {
    //   article.series = await this.articleService.findBySeriesName(
    //     article.seriesName,
    //     Types.ObjectId(),
    //   );
    // }

    return article;
  }
}
