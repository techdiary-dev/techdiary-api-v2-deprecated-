import {
  Resolver,
  Mutation,
  Args,
  Context,
  ID,
  ObjectType,
  Query,
} from '@nestjs/graphql';
import {
  InterAction,
  INTERACTION_TYPE,
  INTERACTION_RESOURCE,
} from './interaction.type';
import { InteractionService } from './interaction.service';
import {
  InteractionInput,
  BookmarkInput,
  LikeInput,
} from './interaction.input';
import { Auth } from 'src/auth/decorators/auth.decorator';
import AppContext, {
  ResourceList,
  PaginationInput,
  Pagination,
} from 'src/shared/types';
import { types } from '@typegoose/typegoose';
import { Types } from 'mongoose';
import { User } from 'src/users/users.type';

@ObjectType()
class InteractionPagination extends Pagination(InterAction) {}

@Resolver('Interaction')
export class InteractionResolver {
  constructor(private readonly interactionService: InteractionService) {}

  @Query(() => InteractionPagination)
  async articleLikers(
    @Args('articleId', { type: () => ID }) articleId: string,
    @Args('pagination', { nullable: true }) pagination: PaginationInput,
  ): Promise<ResourceList<InterAction>> {
    return this.interactionService.interactionStates(
      INTERACTION_TYPE.LIKE,
      INTERACTION_RESOURCE.ARTICLE,
      Types.ObjectId(articleId),
      pagination,
    );
  }
  @Query(() => InteractionPagination)
  async articleBookMarks(
    @Args('articleId', { type: () => ID }) articleId: string,
    @Args('pagination', { nullable: true }) pagination: PaginationInput,
  ): Promise<ResourceList<InterAction>> {
    return this.interactionService.interactionStates(
      INTERACTION_TYPE.BOOKMARK,
      INTERACTION_RESOURCE.ARTICLE,
      Types.ObjectId(articleId),
      pagination,
    );
  }

  // @Auth()
  // @Query(() => InteractionPagination)
  // async myBookmarks(
  //   @Args('pagination', { nullable: true }) pagination: PaginationInput,
  //   @Context() ctx: AppContext,
  // ): Promise<ResourceList<InterAction>> {
  //   return this.interactionService.interactionStatesByUser(
  //     INTERACTION_TYPE.BOOKMARK,
  //     INTERACTION_RESOURCE.ARTICLE,
  //     ctx.req.user.sub,
  //     pagination,
  //   );
  // }

  @Auth()
  @Mutation(() => Boolean)
  async toggleLike(
    @Args('data') data: LikeInput,
    @Context() ctx: AppContext,
  ): Promise<boolean> {
    return this.interactionService.toggleInteraction({
      type: INTERACTION_TYPE.LIKE,
      resource: INTERACTION_RESOURCE.ARTICLE,
      resourceId: Types.ObjectId(data.articleId),
      userId: ctx.req.user.sub,
      isInteracted: data.isLiked,
    });
  }

  @Auth()
  @Mutation(() => Boolean)
  async toggleBookmark(
    @Args('data') data: BookmarkInput,
    @Context() ctx: AppContext,
  ): Promise<boolean> {
    return this.interactionService.toggleInteraction({
      type: INTERACTION_TYPE.BOOKMARK,
      resource: INTERACTION_RESOURCE.ARTICLE,
      resourceId: Types.ObjectId(data.articleId),
      userId: ctx.req.user.sub,
      isInteracted: data.isBookmarked,
    });
  }
}
