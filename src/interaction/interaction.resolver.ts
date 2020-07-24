import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { InterAction } from './interaction.type';
import { DocumentType } from '@typegoose/typegoose';
import { InteractionService } from './interaction.service';
import { InteractionInput } from './interaction.input';
import { Types } from 'mongoose';

@Resolver('Interaction')
export class InteractionResolver {
  constructor(private readonly interactionService: InteractionService) {}

  @Mutation(() => InterAction)
  async toggleLike(
    @Args('data') data: InteractionInput,
  ): Promise<DocumentType<InterAction>> {
    return this.interactionService.toggleLikes(
      Types.ObjectId(data.articleId),
      Types.ObjectId(data.userId),
      data.isLiked,
    );
  }
}
