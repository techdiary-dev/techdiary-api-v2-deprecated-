import { Resolver, Mutation, Args, Context } from '@nestjs/graphql';
// import {
//   InterAction,
//   INTERACTION_TYPE,
//   INTERACTION_RESOURCE,
//   ArticleLikersPagination,
// } from './interaction.type';
import { InteractionService } from './interaction.service';
// import {
//   InteractionInput,
//   BookmarkInput,
//   LikeInput,
// } from './interaction.input';
// import { Auth } from 'src/auth/decorators/auth.decorator';
// import AppContext, { ResourceList } from 'src/shared/types';
// import { Query } from '@nestjs/common';
// import { types } from '@typegoose/typegoose';
// import { Types } from 'mongoose';
// import { User } from 'src/users/users.type';

@Resolver('Interaction')
export class InteractionResolver {
  constructor(private readonly interactionService: InteractionService) {}

  // @Auth()
  // @Mutation(() => Boolean)
  // async toggleLike(
  //   @Args('data') data: LikeInput,
  //   @Context() ctx: AppContext,
  // ): Promise<boolean> {
  //   return this.interactionService.toggleInteraction({
  //     type: INTERACTION_TYPE.LIKE,
  //     resource: INTERACTION_RESOURCE.ARTICLE,
  //     resourceId: Types.ObjectId(data.articleId),
  //     userId: ctx.req.user.sub,
  //     isInteracted: data.isLiked,
  //   });
  // }

  // @Auth()
  // @Mutation(() => Boolean)
  // async toggleBookmark(
  //   @Args('data') data: BookmarkInput,
  //   @Context() ctx: AppContext,
  // ): Promise<boolean> {
  //   return this.interactionService.toggleInteraction({
  //     type: INTERACTION_TYPE.BOOKMARK,
  //     resource: INTERACTION_RESOURCE.ARTICLE,
  //     resourceId: Types.ObjectId(data.articleId),
  //     userId: ctx.req.user.sub,
  //     isInteracted: data.isBookmarked,
  //   });
  // }
}
