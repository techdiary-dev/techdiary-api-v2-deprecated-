import { Ref } from '@typegoose/typegoose';
import { Role } from 'src/role/role.model';
export declare class User {
    name: string;
    username: string;
    email: string;
    password: string;
    role: Ref<Role>;
    comparePassword(passwordText: string): Promise<boolean>;
}
