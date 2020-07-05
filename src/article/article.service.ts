import { Injectable } from '@nestjs/common';
import { Article } from './article.type';
import { InjectModel } from 'nestjs-typegoose';
import { ReturnModelType, DocumentType } from '@typegoose/typegoose';
import { idOrSlugArg, CreateArticleInput } from './article.input';
import { PaginationInput, ResourceList } from 'src/shared/types';
import { index } from 'quick-crud';
import { ObjectId } from 'mongodb';
import { Types } from 'mongoose';

@Injectable()
export class ArticleService {
  constructor(
    @InjectModel(Article)
    private readonly model: ReturnModelType<typeof Article>,
  ) {}

  async getArticleByIdOrSlug(
    idOrSlug: idOrSlugArg,
  ): Promise<DocumentType<Article>> {
    return await this.model.findOne(idOrSlug);
  }

  async createArticle(
    data: CreateArticleInput,
    authorId: string,
  ): Promise<DocumentType<Article>> {
    return this.model.create({ ...data, author: authorId });
  }

  async getPublishedArticles(
    paginationOptions: PaginationInput,
  ): Promise<ResourceList<Article>> {
    return await index({
      model: this.model,
      paginationOptions,
      where: { isPublished: true },
    });
  }

  async findBySeriesName(
    seriesName: string,
    author: string,
  ): Promise<Article[]> {
    return this.model.find({ seriesName, author, isPublished: true });
  }
}
