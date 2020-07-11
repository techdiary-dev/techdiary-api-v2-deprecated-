import { Request, Response } from 'express';
import { JWTPayload } from 'src/session/session.types';
export declare class ResourceList<DataModel> {
    currentPage: number;
    pageCount: number;
    resourceCount: number;
    data: DataModel[];
}
export declare class PaginationInput {
    limit?: number;
    sort?: string;
    page?: number;
}
export interface iRequest extends Request {
    user: JWTPayload;
}
export default interface AppContext {
    req: iRequest;
    res: Response;
}
