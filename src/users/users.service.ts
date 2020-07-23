import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ReturnModelType, DocumentType } from '@typegoose/typegoose';
import { User } from './users.type';
// import { RoleService } from 'src/role/role.service';
import { CreateUserDTO } from './users.dto';
import { Types } from 'mongoose';
import { index } from 'quick-crud';
// import { ResourceList, PaginationQueryDTO } from 'src/shared/types';
// import { RoleService } from 'src/role/role.service';
import { UpdateUserInput } from './users.input';
import { PaginationInput, ResourceList } from 'src/shared/types';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private readonly model: ReturnModelType<typeof User>, // private readonly roleService: RoleService,
  ) {}

  // async list(query: PaginationQueryDTO): Promise<ResourceList<User>> {
  //   return index({ model: this.model, paginationOptions: query });
  // }

  async findOrCreateUser(data: CreateUserDTO): Promise<DocumentType<User>> {
    const existsed = await this.getByGithubUID(data.githubUID);
    if (existsed) {
      return existsed;
    } else {
      return this.createUser(data);
    }
  }

  async createUser(data: CreateUserDTO): Promise<DocumentType<User>> {
    // const { _id: roleId } = await this.roleService.getRoleByName('USER');
    const user = await this.model.create({
      ...data,
      // role: roleId,
    });
    return user;
  }

  async getById(_id: Types.ObjectId): Promise<DocumentType<User>> {
    return this.model.findOne({ _id });
  }

  async getByUsername(username: string): Promise<DocumentType<User>> {
    return this.model.findOne({
      // source: https://stackoverflow.com/a/7101938/3705299
      username: { $regex: new RegExp('^' + username.toLowerCase(), 'i') },
    });
  }

  async update(
    _id: Types.ObjectId,
    data: UpdateUserInput,
  ): Promise<DocumentType<User>> {
    return this.model.findOneAndUpdate({ _id }, data, { new: true });
  }
  async getByGithubUID(code: string): Promise<DocumentType<User>> {
    return this.model.findOne({ githubUID: code });
  }

  async getAllUser(query: PaginationInput): Promise<ResourceList<User>> {
    return index({ model: this.model, paginationOptions: query });
  }
}
