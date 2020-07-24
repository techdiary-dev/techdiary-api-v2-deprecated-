import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { InterAction, INTERACTION_TYPE } from './interaction.type';
import { ReturnModelType, DocumentType } from '@typegoose/typegoose';
import { Types } from 'mongoose';
import { ArticleService } from 'src/article/article.service';

@Injectable()
export class InteractionService {
  constructor(
    @InjectModel(InterAction)
    private readonly model: ReturnModelType<typeof InterAction>,
    private readonly articleService: ArticleService,
  ) {}

  async toggleLikes(
    articleId: Types.ObjectId,
    userId: Types.ObjectId,
    isLiked: boolean,
  ): Promise<DocumentType<InterAction>> {
    const interaction = await this.model.findOne({
      articleId,
      userId,
      type: INTERACTION_TYPE.LIKE,
    });

    // Make a like
    if (!interaction && isLiked) {
      return this.model.create({
        articleId,
        userId,
        type: INTERACTION_TYPE.LIKE,
      });
    }
    // Remove the like
    else if (interaction && !isLiked) {
      await interaction.remove();
    }

    return interaction;
  }

  // async toggleBookmarks(){

  // }

  // async interactions(){

  // }
}
