import { ReturnModelType, DocumentType } from '@typegoose/typegoose';
import { User } from './users.type';
import { CreateUserDTO } from './users.dto';
import { Types } from 'mongoose';
import { UpdateUserInput } from './users.input';
export declare class UsersService {
    private readonly model;
    constructor(model: ReturnModelType<typeof User>);
    findOrCreateUser(data: CreateUserDTO): Promise<DocumentType<User>>;
    createUser(data: CreateUserDTO): Promise<DocumentType<User>>;
    getById(_id: string): Promise<DocumentType<User>>;
    getByUsername(username: string): Promise<DocumentType<User>>;
    update(_id: Types.ObjectId, data: UpdateUserInput): Promise<DocumentType<User>>;
    getByGithubUID(code: string): Promise<DocumentType<User>>;
}
