import { ReturnModelType, DocumentType } from '@typegoose/typegoose';
import { ConfigService } from '@nestjs/config';
import { CreateRoleDTO } from './role.dto';
import { Role } from './role.model';
import { ResourceList, PaginationInput } from 'src/shared/types';
export declare class RoleService {
    private readonly model;
    private readonly config;
    constructor(model: ReturnModelType<typeof Role>, config: ConfigService);
    roleList(query: PaginationInput): Promise<ResourceList<DocumentType<Role>>>;
    createRole(data: CreateRoleDTO): Promise<DocumentType<Role>>;
    getRoleByName(name: string): Promise<DocumentType<Role>>;
    createDefaultRole(): Promise<DocumentType<Role>>;
}
