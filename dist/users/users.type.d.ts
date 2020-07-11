import { ArticlePayload } from 'src/article/article.input';
import { Types } from 'mongoose';
export declare class Link {
    text: string;
    link: string;
}
export declare class WorkInfo {
    name: string;
    designation: string;
    startTime: string;
    endTime: string;
}
export declare class User {
    _id: Types.ObjectId;
    name: string;
    username: string;
    email?: string;
    profilePhoto?: string;
    githubUID: string;
    education?: string;
    designation?: string;
    location?: string;
    bio?: string;
    links?: Link[];
    workInfo?: WorkInfo[];
    skills?: string[];
    articles?: ArticlePayload;
}
