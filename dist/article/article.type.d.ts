import { ObjectId } from 'mongodb';
import { Ref } from '@typegoose/typegoose';
import { User } from 'src/users/users.type';
export declare class Article {
    _id?: ObjectId;
    title: string;
    slug?: string;
    excerpt?: string;
    body: string;
    isPublished: boolean;
    isPinned?: boolean;
    thumbnail?: string;
    tags?: string[];
    author?: Ref<User>;
    createdAt?: string;
    updatedAt?: string;
    series?: Article[];
    seriesName?: string;
    url?: string;
}
