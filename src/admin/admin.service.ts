import {
  Injectable,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';

import { InjectModel } from 'nestjs-typegoose';
import { ReturnModelType, DocumentType } from '@typegoose/typegoose';
import { store, show } from 'quick-crud';
import { Admin } from './admin.type';
import {
  CreateAdminInput,
  UpdateAdminInput,
  UpdatePassword,
} from './admin.input';
import { Types } from 'mongoose';
import AppContext, { PaginationInput, ResourceList } from 'src/shared/types';
import { SessionService } from 'src/session/session.service';
import { AUTH_DOMAIN } from 'src/session/session.type';
import { hashSync } from 'bcryptjs';
import { User } from 'src/users/users.type';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(Admin)
    private readonly model: ReturnModelType<typeof Admin>,
    private readonly userService: UsersService,
    private readonly sessionService: SessionService,
    private readonly jwt: JwtService,
  ) {}

  /**
   * Create an admin
   * @param data CreateAdminDTO
   */
  async create(data: CreateAdminInput): Promise<DocumentType<Admin>> {
    return store({ model: this.model, data });
  }

  /**
   * Get an admin via _id
   * @param _id admin doc objectId
   */
  async getById(_id: Types.ObjectId): Promise<DocumentType<Admin>> {
    return show({ model: this.model, where: { _id } });
  }

  /**
   * Get a admin by username
   * @param username admin username
   */
  async getByUsername(username: string): Promise<Admin> {
    return show({ model: this.model, where: { username } });
  }

  /**
   * Get and admin by email address
   * @param email admin email address
   */

  async getByEmail(email: string): Promise<Admin> {
    return show({ model: this.model, where: { email } });
  }

  /**
   * Get an admin by identifier
   * @param identifier email address or username
   */
  async getByIdentifier(identifier: string): Promise<DocumentType<Admin>> {
    const admin = await this.model.findOne({
      $or: [{ username: identifier }, { email: identifier }],
    });

    return admin;
  }

  async update(
    _id: Types.ObjectId,
    data: UpdateAdminInput,
  ): Promise<DocumentType<Admin>> {
    return this.model.findOneAndUpdate({ _id }, { ...data }, { new: true });
  }

  /**
   * Get admin count
   * @return number
   */
  async count(): Promise<any> {
    return this.model.countDocuments({});
  }

  async getMe(ctx: AppContext): Promise<DocumentType<Admin>> {
    const admin = await this.getById(ctx.req.user.sub);
    if (!admin) ctx.res.clearCookie('token');
    return admin;
  }

  /**
   * Change Password By Admin
   * @param _id Subscriber _id
   * @param newPassword admin new password
   * @param domain admin domain
   */

  async changePassword(
    _id: Types.ObjectId,
    data: UpdatePassword,
  ): Promise<string> {
    const admin = await this.model.findById(_id);

    const matched = await admin.comparePassword(data.oldPassword);

    if (!matched)
      throw new NotFoundException('Your current password is wrong.');

    const newHashPassword = hashSync(data.newPassword);

    const updated = await this.model.updateOne(
      { _id },
      { password: newHashPassword },
    );
    if (updated.n) {
      this.sessionService.deleteSession(_id, AUTH_DOMAIN.ADMIN);
      return 'Successfully Changed the password. ';
    }
  }

  async getAllUsers(query: PaginationInput): Promise<ResourceList<User>> {
    return this.userService.getAllUser(query);
  }
}
