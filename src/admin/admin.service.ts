import { Injectable, Type, ForbiddenException } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ReturnModelType, DocumentType } from '@typegoose/typegoose';
import { store, show } from 'quick-crud';
import { Admin } from './admin.type';
import { CreateAdminInput, UpdateAdminInput } from './admin.input';
import { Types } from 'mongoose';
import AppContext, { PaginationInput, ResourceList } from 'src/shared/types';
import { SessionService } from 'src/session/session.service';
import { Session } from '../session/session.model';
import { AUTH_DOMAIN } from 'src/session/session.types';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(Admin)
    private readonly model: ReturnModelType<typeof Admin>,
    private readonly sessionService: SessionService,
    private readonly jwt: JwtService
  ) { }

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
  async getById(_id: string): Promise<Admin> {
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

  /**
   * Get All Session By Admin
   * @param PaginationInput pagination
   */

  async getAllSession(sub:Types.ObjectId,query: PaginationInput): Promise<ResourceList<Session>> {

    return this.sessionService.getAllSession(sub,query)
  }

  /**
   * Delete Session By Admin
   * @param sub Subscriber _id
   * @param domain Subscriber domain
   */

  async removeSession(sub: Types.ObjectId, domain: AUTH_DOMAIN): Promise<string> {

    if (this.sessionService.deleteSession(sub, domain)) {
      return 'You have remove session successfully';
    } else {
      throw new ForbiddenException(
        'Invalid id or you have already  removed',
      );
    }

  }

  async getMe(ctx: AppContext): Promise<DocumentType<Admin>> {
    //@ts-ignore
    return this.getById(ctx.req.user.sub);
  }

}
