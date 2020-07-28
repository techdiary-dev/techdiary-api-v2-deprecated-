import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { ArticleService } from 'src/article/article.service';
import { UsersService } from 'src/users/users.service';
import { InjectModel } from 'nestjs-typegoose';
import { Comment } from './comment.type';
import { ReturnModelType, isDocument } from '@typegoose/typegoose';
import { CreateCommentInput, UpdateCommentInput } from './comment.input';
import { Types } from 'mongoose';
import { index } from 'quick-crud';
import { PaginationInput, ResourceList } from 'src/shared/types';

@Injectable()
export class CommentService {
  constructor(
    @InjectModel(Comment)
    private readonly model: ReturnModelType<typeof Comment>,
  ) {}

  async getCommentById(_id: Types.ObjectId) {
    const comment = await this.model.findOne({ _id });
    if (!comment) throw new NotFoundException('Comment not found');
    return comment;
  }

  async getCommentsByArticle(
    articleId: Types.ObjectId,
    paginationOptions: PaginationInput,
  ): Promise<ResourceList<Comment>> {
    const comments = await index({
      model: this.model,
      where: { article: articleId, parent: undefined },
      paginationOptions,
    });
    return comments;
  }

  async createComment(data: CreateCommentInput, author: Types.ObjectId) {
    if (data.parent) {
      await this.getCommentById(data.parent);
    }
    return this.model.create({ ...data, author });
  }

  async updateComment(
    _id: Types.ObjectId,
    data: UpdateCommentInput,
    author: Types.ObjectId,
  ) {
    const comment = await this.getCommentById(_id);
    if (!(isDocument(comment.author) && comment.author._id.equals(author)))
      throw new ForbiddenException("This comment doesn't belongs to you.");
    return this.model.findOneAndUpdate({ _id }, data, { new: true });
  }

  async deleteComment(_id: Types.ObjectId, author: Types.ObjectId) {
    const comment = await this.getCommentById(_id);
    if (!(isDocument(comment.author) && comment.author._id.equals(author)))
      throw new ForbiddenException("This comment doesn't belongs to you.");

    await this.model.deleteMany({ parent: _id });
    return this.model.findByIdAndDelete({ _id });
  }

  async getCommentsCountByArticleId(
    articleId: Types.ObjectId,
  ): Promise<number> {
    return this.model.find({ article: articleId }).countDocuments();
  }
}
