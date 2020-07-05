import { prop, plugin } from '@typegoose/typegoose';
import * as uniqueValidator from 'mongoose-unique-validator';
import { Permissions } from './role.type';

@plugin(uniqueValidator, { message: '{VALUE} already taken' })
export class Role {
  @prop({ required: true, unique: true })
  name: string;

  @prop({
    type: String,
    enum: Object.values(Permissions),
    required: true,
  })
  permissions: Permissions[];
}
