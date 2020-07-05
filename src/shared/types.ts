import {} from 'class-validator';

export interface ResourceList<DataModel> {
  currentPage: number;
  pageCount: number;
  resourceCount: number;
  data: DataModel[];
}

export class PaginationQueryDTO {
  page?: number;

  limit?: number;

  sort?: string;
}
