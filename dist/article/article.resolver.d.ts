import { Article } from './article.type';
import { idOrSlugArg, CreateArticleInput, updateArticleArgs } from './article.input';
import AppContext, { PaginationInput, ResourceList } from 'src/shared/types';
import { ArticleService } from './article.service';
import { DocumentType } from '@typegoose/typegoose';
export declare class ArticleResolver {
    private readonly articleService;
    constructor(articleService: ArticleService);
    articles(paginationOptions: PaginationInput): Promise<ResourceList<Article>>;
    article(idOrSlug: idOrSlugArg): Promise<DocumentType<Article>>;
    createArticle(data: CreateArticleInput, ctx: AppContext): Promise<Article>;
    updateArticle({ data, _id }: updateArticleArgs, ctx: AppContext): Promise<Article>;
    deleteArticle(_id: string, ctx: AppContext): Promise<Article>;
    url(parent: Article): string;
    excerpt(parent: Article, wordsCount?: number): string;
    series(parent: Article): Promise<DocumentType<Article>[]>;
}
