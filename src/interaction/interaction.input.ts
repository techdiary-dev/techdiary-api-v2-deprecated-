import { InputType, Field, ID } from '@nestjs/graphql';
import { INTERACTION_TYPE, INTERACTION_RESOURCE } from './interaction.type';
import { Types } from 'mongoose';

export class InteractionTogglerType {
  type: INTERACTION_TYPE;
  resource: INTERACTION_RESOURCE;
  resourceId: Types.ObjectId;
  userId: Types.ObjectId;
  isInteracted: boolean;
}

@InputType()
export class InteractionInput {
  @Field(() => ID)
  articleId: string;

  @Field()
  isInteracted: boolean;

  @Field()
  type: INTERACTION_TYPE;
}

@InputType()
export class BookmarkInput {
  @Field(() => ID)
  articleId: string;

  @Field()
  isBookmarked: boolean;
}

@InputType()
export class LikeInput {
  @Field(() => ID)
  articleId: string;

  @Field()
  isLiked: boolean;
}
