import { Resolver, Mutation } from '@nestjs/graphql';
import { Comment } from './comment.type';

@Resolver(() => Comment)
export class CommentResolver {
  @Mutation(() => Comment)
  async createComment() {}
}
