import { Article } from './article.type';
import { ReturnModelType, DocumentType } from '@typegoose/typegoose';
import { idOrSlugArg, CreateArticleInput, updateArticleInput } from './article.input';
import { PaginationInput, ResourceList } from 'src/shared/types';
import { Types } from 'mongoose';
export declare class ArticleService {
    private readonly model;
    constructor(model: ReturnModelType<typeof Article>);
    getArticleByIdOrSlug(idOrSlug: idOrSlugArg): Promise<DocumentType<Article>>;
    getAuthorArticles(authorId: Types.ObjectId, paginationOptions: PaginationInput, isPublished?: boolean): Promise<ResourceList<Article>>;
    createArticle(data: CreateArticleInput, authorId: Types.ObjectId): Promise<DocumentType<Article>>;
    updateArticle(data: updateArticleInput, _id: Types.ObjectId, authorId: Types.ObjectId): Promise<DocumentType<Article>>;
    getPublishedArticles(paginationOptions: PaginationInput): Promise<ResourceList<Article>>;
    findSeriesArticles(article: Article): Promise<DocumentType<Article>[]>;
    deleteArticle(_id: Types.ObjectId, authorId: Types.ObjectId): Promise<DocumentType<Article>>;
}
