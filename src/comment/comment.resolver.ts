import {
  Resolver,
  Mutation,
  Context,
  Args,
  ID,
  Query,
  ObjectType,
} from '@nestjs/graphql';
import { Comment } from './comment.type';
import { Auth } from 'src/auth/decorators/auth.decorator';
import AppContext, { Pagination, PaginationInput } from 'src/shared/types';
import { CreateCommentInput, UpdateCommentInput } from './comment.input';
import { CommentService } from './comment.service';
import { Types } from 'mongoose';
import { isRefType, isDocument } from '@typegoose/typegoose';
import { ForbiddenException, NotFoundException } from '@nestjs/common';

@ObjectType()
class PaginateComment extends Pagination(Comment) {}
@Resolver(() => Comment)
export class CommentResolver {
  constructor(private readonly commentService: CommentService) {}

  @Query(() => PaginateComment)
  async getCommentsByArticle(
    @Args('articleId', { type: () => ID }) articleId: Types.ObjectId,
    @Args('pagination', { nullable: true }) paginationOption: PaginationInput,
  ) {
    return this.commentService.getCommentsByArticle(
      articleId,
      paginationOption,
    );
  }

  @Mutation(() => Comment)
  @Auth()
  async createComment(
    @Context() ctx: AppContext,
    @Args('data') data: CreateCommentInput,
  ) {
    return this.commentService.createComment(data, ctx.req.user.sub);
  }

  @Mutation(() => Comment)
  @Auth()
  async updateComment(
    @Context() ctx: AppContext,
    @Args('_id', { type: () => ID }) _id: Types.ObjectId,
    @Args('data') data: UpdateCommentInput,
  ) {
    return this.commentService.updateComment(_id, data, ctx.req.user.sub);
  }

  @Mutation(() => Comment)
  @Auth()
  async deleteComment(
    @Context() ctx: AppContext,
    @Args('_id', { type: () => ID }) _id: Types.ObjectId,
  ) {
    return this.commentService.deleteComment(_id, ctx.req.user.sub);
  }
}
