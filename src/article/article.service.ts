import {
  Injectable,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { Article } from './article.type';
import { InjectModel } from 'nestjs-typegoose';
import {
  ReturnModelType,
  DocumentType,
  isDocument,
} from '@typegoose/typegoose';
import {
  idOrSlugArg,
  CreateArticleInput,
  updateArticleInput,
} from './article.input';
import { PaginationInput, ResourceList } from 'src/shared/types';
import { index } from 'quick-crud';
import { Types } from 'mongoose';
import { AUTH_DOMAIN } from 'src/session/session.type';

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
    tags: string[],
    paginationOptions: PaginationInput,
    and = true,
  ): Promise<ResourceList<Article>> {
    const allTags = tags.map(tag => ({
      tags: { $regex: new RegExp('^' + tag.toLowerCase(), 'i') },
    }));

    const andOperator = and ? '$and' : '$or';
    return await index({
      model: this.model,
      paginationOptions,
      where: { [andOperator]: allTags, isPublished: true },
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
    domain: AUTH_DOMAIN,
  ): Promise<DocumentType<Article>> {
    const article = await this.model.findOne({ _id });

    if (!article) throw new NotFoundException('ডায়েরি পাওয়া যায়নি');

    if (!(isDocument(article.author) && article.author._id.equals(authorId))) {
      throw new ForbiddenException('এটি আপনার ডায়েরি নয়');
    }
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
    domain: AUTH_DOMAIN,
  ): Promise<DocumentType<Article>> {
    const article = await this.getArticleByIdOrSlug({ _id });

    if (!article) throw new NotFoundException('ডায়েরি পাওয়া যায়নি');

    if (
      !(
        domain === AUTH_DOMAIN.ADMIN ||
        (isDocument(article.author) && article.author._id.equals(authorId))
      )
    ) {
      throw new ForbiddenException('এটি আপনার ডায়েরি নয়');
    }
    return this.model.findOneAndDelete({ _id });
  }
}
