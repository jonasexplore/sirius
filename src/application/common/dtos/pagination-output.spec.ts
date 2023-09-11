import { SearchResult } from '@/domain/common/repositories/repository-contract';

import { PaginationOutputMapper } from './pagination-output';

describe('🔖 Pagination Output', () => {
  it('should convert a searchResult in output', () => {
    const searchResult = new SearchResult({
      current_page: 1,
      items: [],
      per_page: 2,
      total: 1,
      sort: null,
      sort_dir: null,
      filter: null,
    });

    const output = PaginationOutputMapper.toPaginationOutput(searchResult);

    expect(output).toStrictEqual({
      total: 1,
      current_page: 1,
      last_page: 1,
      per_page: 2,
    });
  });
});
