import {
  Injectable,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { Article } from './article.type';
import { InjectModel } from 'nestjs-typegoose';
import { ReturnModelType, DocumentType } from '@typegoose/typegoose';
import {
  idOrSlugArg,
  CreateArticleInput,
  updateArticleInput,
} from './article.input';
import { PaginationInput, ResourceList } from 'src/shared/types';
import { index } from 'quick-crud';
import { Types } from 'mongoose';
import { PaginationOptions } from 'quick-crud/dist/utils/interfaces';

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

  async ArticlesByTag(
    tag: string,
    paginationOptions: PaginationInput,
  ): Promise<ResourceList<Article>> {
    return await index({
      model: this.model,
      paginationOptions,
      where: { tags: [{ $regex: new RegExp('^' + tag.toLowerCase(), 'i') }] },
    });
  }

  async getAuthorArticles(
    authorId: Types.ObjectId,
    paginationOptions: PaginationInput,
    isPublished?: boolean,
  ): Promise<ResourceList<Article>> {
    const filtered: { author: Types.ObjectId; isPublished?: boolean } = {
      author: authorId,
    };
    if (isPublished) filtered.isPublished = isPublished;
    return await index({
      model: this.model,
      paginationOptions,
      where: { ...filtered },
    });
  }

  async createArticle(
    data: CreateArticleInput,
    authorId: Types.ObjectId,
  ): Promise<DocumentType<Article>> {
    return this.model.create({ ...data, author: authorId });
  }

  async updateArticle(
    data: updateArticleInput,
    _id: Types.ObjectId,
    authorId: Types.ObjectId,
  ): Promise<DocumentType<Article>> {
    const article = await this.model.findOne({ _id });

    if (!article) throw new NotFoundException('ডায়েরি পাওয়া যায়নি');

    // @ts-ignore
    if (!article.author.equals(authorId))
      throw new ForbiddenException('এটি আপনার ডায়েরি নয়');

    return this.model.findOneAndUpdate({ _id }, data, { new: true });
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

  async findSeriesArticles(article: Article): Promise<DocumentType<Article>[]> {
    return this.model.find({
      seriesName: article.seriesName,
      author: article.author,
      isPublished: true,
    });
  }

  async deleteArticle(
    _id: Types.ObjectId,
    authorId: Types.ObjectId,
  ): Promise<DocumentType<Article>> {
    const article = await this.getArticleByIdOrSlug({ _id });

    if (!article) throw new NotFoundException('ডায়েরি পাওয়া যায়নি');

    // @ts-ignore
    if (!article.author.equals(authorId))
      throw new ForbiddenException('এটি আপনার ডায়েরি নয়');

    return this.model.findOneAndDelete({ _id });
  }
}
