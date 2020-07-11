import { Article } from './article.type';
import { Types } from 'mongoose';
export declare class idOrSlugArg {
    _id?: Types.ObjectId;
    slug?: string;
}
export declare class ArticlePayload {
    resourceCount: number;
    pageCount: number;
    currentPage: number;
    data: Article[];
}
export declare class CreateArticleInput {
    title: string;
    body: string;
    isPublished: boolean;
    thumbnail?: string;
    tags?: string[];
    seriesName?: string;
}
export declare class updateArticleInput {
    title?: string;
    body?: string;
    tags?: string[];
    thumbnail?: string;
    isPublished?: boolean;
    seriesName?: string;
}
export declare class updateArticleArgs {
    data?: updateArticleInput;
    _id: string;
}
