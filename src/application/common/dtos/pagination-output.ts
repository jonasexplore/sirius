import { SearchResult } from '@/domain/common/repositories/repository-contract';

export type PaginationOutput<Item = unknown> = {
  items: Item[];
  total: number;
  current_page: number;
  last_page: number;
  per_page: number;
};

export class PaginationOutputMapper {
  static toPaginationOutput(
    result: SearchResult,
  ): Omit<PaginationOutput, 'items'> {
    return {
      total: result.total,
      current_page: result.current_page,
      last_page: result.last_page,
      per_page: result.per_page,
    };
  }
}
