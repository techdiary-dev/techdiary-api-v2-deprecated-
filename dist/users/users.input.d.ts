import { Link, WorkInfo } from './users.type';
export declare class UpdateUserInput {
    name?: string;
    username?: string;
    email?: string;
    profilePhoto?: string;
    education?: string;
    designation?: string;
    location?: string;
    bio?: string;
    links?: Link[];
    skills?: string[];
    workInfo?: WorkInfo[];
}
