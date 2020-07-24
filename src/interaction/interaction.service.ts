import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { InterAction, INTERACTION_TYPE } from './interaction.type';
import { ReturnModelType } from '@typegoose/typegoose';
import { PaginationInput, ResourceList } from 'src/shared/types';
import { index } from 'quick-crud';
import { InteractionTogglerType } from './interaction.input';

@Injectable()
export class InteractionService {
  constructor(
    @InjectModel(InterAction)
    private readonly model: ReturnModelType<typeof InterAction>,
  ) {}

  async toggleInteraction({
    type,
    resource,
    resourceId,
    userId,
    isInteracted,
  }: InteractionTogglerType): Promise<boolean> {
    const interaction = await this.model.findOne({
      resource,
      resourceId,
      user: userId,
      type,
    });

    // Make a like
    if (!interaction && isInteracted) {
      await this.model.create({
        resource,
        resourceId,
        user: userId,
        type,
      });
      return true;
    }
    // Remove the like
    else if (interaction && !isInteracted) {
      await interaction.remove();
      return true;
    }
    return false;
  }

  async interactionStates(
    type: INTERACTION_TYPE,
    resource: string,
    resourceId: string,
    pagination: PaginationInput,
  ): Promise<ResourceList<InterAction>> {
    return index({
      model: this.model,
      where: { resource, resourceId, type },
      paginationOptions: pagination,
    });
  }
}
