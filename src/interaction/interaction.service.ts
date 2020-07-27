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
  convertSortStringToObject(sort = '-createdAt') {
    const newSortObject = sort
      .split(' ')
      .map(el =>
        el.trim().includes('-') ? { [el.replace('-', '')]: -1 } : { [el]: 1 },
      )
      .reduce((obj, item) => Object.assign(obj, item));
    return newSortObject;
  }
  async interactionStatesByUser(
    type: INTERACTION_TYPE,
    resource: INTERACTION_RESOURCE,
    user: Types.ObjectId,
    pagination: PaginationInput,
  ) {
    const resourceLowerCase = resource.toLowerCase();
    // const resourceCount = await this.model
    //   .find({ resource, type, user })
    //   .countDocuments();
    const aggregation: any[] = [
      {
        $match: {
          type,
          user,
          resource,
        },
      },
      {
        $lookup: {
          from: `${resourceLowerCase}s`,
          localField: 'resourceId',
          foreignField: '_id',
          as: resourceLowerCase,
        },
      },
      {
        $set: {
          [resourceLowerCase]: { $arrayElemAt: [`$${resourceLowerCase}`, 0] },
        },
      },

      {
        $lookup: {
          from: 'users',
          localField: `${resourceLowerCase}.author`,
          foreignField: '_id',
          as: `${resourceLowerCase}.author`,
        },
      },
      {
        $set: {
          [`${resourceLowerCase}.author`]: {
            $arrayElemAt: [`${resourceLowerCase}.author`, 0],
          },
        },
      },
      {
        $sort: this.convertSortStringToObject(pagination?.sort),
      },
    ];
    if (pagination?.limit)
      aggregation.push({
        $limit: pagination.limit,
      });
    const resources = await this.model.aggregate(aggregation);
    return resources;
  }
}
