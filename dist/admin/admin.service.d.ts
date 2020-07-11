import { ReturnModelType, DocumentType } from '@typegoose/typegoose';
import { Admin } from './admin.type';
import { CreateAdminInput, UpdateAdminInput } from './admin.input';
import { Types } from 'mongoose';
export declare class AdminService {
    private readonly model;
    constructor(model: ReturnModelType<typeof Admin>);
    create(data: CreateAdminInput): Promise<DocumentType<Admin>>;
    getById(_id: string): Promise<Admin>;
    getByUsername(username: string): Promise<Admin>;
    getByEmail(email: string): Promise<Admin>;
    getByIdentifier(identifier: string): Promise<DocumentType<Admin>>;
    update(_id: Types.ObjectId, data: UpdateAdminInput): Promise<DocumentType<Admin>>;
    count(): Promise<any>;
}
