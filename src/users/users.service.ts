import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ReturnModelType, DocumentType } from '@typegoose/typegoose';
import { User } from './users.type';
// import { RoleService } from 'src/role/role.service';
import { CreateUserDTO } from './users.dto';
// import { store, show, index } from 'quick-crud';
// import { ResourceList, PaginationQueryDTO } from 'src/shared/types';
// import { RoleService } from 'src/role/role.service';

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

  async getById(_id: string): Promise<DocumentType<User>> {
    return this.model.findOne({ _id });
  }

  // async getByUsername(username: string): Promise<DocumentType<User>> {
  //   return this.model.findOne({ username });
  // }

  // async getByEmail(email: string): Promise<User> {
  //   return this.model.findOne({ email });
  // }

  async getByGithubUID(code: string): Promise<DocumentType<User>> {
    return this.model.findOne({ githubUID: code });
  }
}
