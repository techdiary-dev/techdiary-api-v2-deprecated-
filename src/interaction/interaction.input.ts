import { InputType, Field, ID } from '@nestjs/graphql';
import { INTERACTION_TYPE } from './interaction.type';

@InputType()
export class InteractionInput {
  @Field(() => ID)
  articleId: string;

  @Field(() => ID)
  userId: string;

  @Field()
  isLiked: boolean;
}
