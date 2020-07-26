import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import {
  InterAction,
  INTERACTION_TYPE,
  INTERACTION_RESOURCE,
} from './interaction.type';
import { ReturnModelType } from '@typegoose/typegoose';
import { PaginationInput, ResourceList } from 'src/shared/types';
import { index } from 'quick-crud';
import { InteractionTogglerType } from './interaction.input';
import { Types } from 'mongoose';

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
    resource: INTERACTION_RESOURCE,
    resourceId: Types.ObjectId,
    pagination: PaginationInput,
  ): Promise<ResourceList<InterAction>> {
    return index({
      model: this.model,
      where: { resource, resourceId, type },
      paginationOptions: pagination,
    });
  }
  async interactionStatesByUser(
    type: INTERACTION_TYPE,
    resource: INTERACTION_RESOURCE,
    user: Types.ObjectId,
    pagination: PaginationInput,
  ): Promise<ResourceList<InterAction>> {
    // this.model.aggregate
    return index({
      model: this.model,
      where: { resource, type, user },
      paginationOptions: pagination,
    });
  }
}
