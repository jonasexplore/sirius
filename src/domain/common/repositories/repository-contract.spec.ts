import { SearchParams, SearchResult } from './repository-contract';

describe('🔖 Repository Contract', () => {
  it('page prop', () => {
    const params = new SearchParams();
    expect(params.page).toBe(1);

    const arrange = [
      { page: null, expected: 1 },
      { page: undefined, expected: 1 },
      { page: '', expected: 1 },
      { page: 'fake', expected: 1 },
      { page: 0, expected: 1 },
      { page: -1, expected: 1 },
      { page: 5.5, expected: 1 },
      { page: true, expected: 1 },
      { page: false, expected: 1 },
      { page: {}, expected: 1 },
      { page: 1, expected: 1 },
      { page: 2, expected: 2 },
    ];

    for (const { page, expected } of arrange) {
      const pageParam = new SearchParams({ page: page as any });
      expect(pageParam.page).toBe(expected);
    }
  });

  it('per_page prop', () => {
    const params = new SearchParams();
    expect(params.per_page).toBe(15);

    const arrange = [
      { per_page: null, expected: 15 },
      { per_page: undefined, expected: 15 },
      { per_page: '', expected: 15 },
      { per_page: 'fake', expected: 15 },
      { per_page: 0, expected: 15 },
      { per_page: -1, expected: 15 },
      { per_page: 5.5, expected: 15 },
      { per_page: true, expected: 15 },
      { per_page: false, expected: 15 },
      { per_page: {}, expected: 15 },
      { per_page: 1, expected: 1 },
      { per_page: 2, expected: 2 },
      { per_page: 10, expected: 10 },
    ];

    for (const { per_page, expected } of arrange) {
      const perPageParam = new SearchParams({ per_page: per_page as any });
      expect(perPageParam.per_page).toBe(expected);
    }
  });

  it('sort prop', () => {
    const params = new SearchParams();
    expect(params.sort).toBeNull();

    const arrange = [
      { sort: null, expected: null },
      { sort: undefined, expected: null },
      { sort: '', expected: null },
      { sort: 0, expected: '0' },
      { sort: -1, expected: '-1' },
      { sort: 5.5, expected: '5.5' },
      { sort: true, expected: 'true' },
      { sort: false, expected: 'false' },
      { sort: {}, expected: '[object Object]' },
      { sort: 'field', expected: 'field' },
      { sort: 1, expected: '1' },
      { sort: 2, expected: '2' },
      { sort: 10, expected: '10' },
    ];

    for (const { sort, expected } of arrange) {
      const perPageParam = new SearchParams({ sort: sort as any });
      expect(perPageParam.sort).toBe(expected);
    }
  });

  it('sort_dir prop', () => {
    let params = new SearchParams();
    expect(params.sort_dir).toBeNull();

    params = new SearchParams({ sort: null });
    expect(params.sort_dir).toBeNull();

    params = new SearchParams({ sort: undefined });
    expect(params.sort_dir).toBeNull();

    params = new SearchParams({ sort: '' });
    expect(params.sort_dir).toBeNull();

    const arrange = [
      { sort_dir: null, expected: 'asc' },
      { sort_dir: undefined, expected: 'asc' },
      { sort_dir: '', expected: 'asc' },
      { sort_dir: 0, expected: 'asc' },
      { sort_dir: -1, expected: 'asc' },
      { sort_dir: 5.5, expected: 'asc' },
      { sort_dir: true, expected: 'asc' },
      { sort_dir: false, expected: 'asc' },
      { sort_dir: {}, expected: 'asc' },
      { sort_dir: 'field', expected: 'asc' },
      { sort_dir: 'asc', expected: 'asc' },
      { sort_dir: 'desc', expected: 'desc' },
      { sort_dir: 'ASC', expected: 'asc' },
      { sort_dir: 'DESC', expected: 'desc' },
    ];

    for (const { sort_dir, expected } of arrange) {
      const perPageParam = new SearchParams({
        sort: 'field',
        sort_dir: sort_dir as any,
      });
      expect(perPageParam.sort_dir).toBe(expected);
    }
  });

  it('filter prop', () => {
    const params = new SearchParams();
    expect(params.filter).toBeNull();

    const arrange = [
      { filter: null, expected: null },
      { filter: undefined, expected: null },
      { filter: '', expected: null },
      { filter: 0, expected: '0' },
      { filter: -1, expected: '-1' },
      { filter: 5.5, expected: '5.5' },
      { filter: true, expected: 'true' },
      { filter: false, expected: 'false' },
      { filter: {}, expected: '[object Object]' },
      { filter: 'field', expected: 'field' },
      { filter: 1, expected: '1' },
      { filter: 2, expected: '2' },
      { filter: 10, expected: '10' },
    ];

    for (const { filter, expected } of arrange) {
      const perPageParam = new SearchParams({ filter: filter as any });
      expect(perPageParam.filter).toBe(expected);
    }
  });
});

describe('🔖 Repository Contract - Search Result', () => {
  it('constructor props', () => {
    const variations = [
      {
        props: {
          items: ['entity1', 'entity2'] as any,
          total: 4,
          current_page: 1,
          per_page: 2,
          sort: null,
          sort_dir: null,
          filter: null,
        },
        expected: {
          items: ['entity1', 'entity2'] as any,
          total: 4,
          current_page: 1,
          per_page: 2,
          last_page: 2,
          sort: null,
          sort_dir: null,
          filter: null,
        },
      },
      {
        props: {
          items: ['entity1', 'entity2'] as any,
          total: 4,
          current_page: 1,
          per_page: 2,
          sort: 'name',
          sort_dir: 'asc',
          filter: 'test',
        },
        expected: {
          items: ['entity1', 'entity2'] as any,
          total: 4,
          current_page: 1,
          per_page: 2,
          last_page: 2,
          sort: 'name',
          sort_dir: 'asc',
          filter: 'test',
        },
      },
      {
        props: {
          items: ['entity1', 'entity2'] as any,
          total: 4,
          current_page: 1,
          per_page: 2,
          sort: 'name',
          sort_dir: 'asc',
          filter: 'test',
        },
        expected: {
          items: ['entity1', 'entity2'] as any,
          total: 4,
          current_page: 1,
          per_page: 2,
          last_page: 2,
          sort: 'name',
          sort_dir: 'asc',
          filter: 'test',
        },
      },
    ];

    for (const { props, expected } of variations) {
      const result = new SearchResult(props);
      expect(result.toJSON()).toStrictEqual(expected);
    }
  });

  it('should set last_page equal 1 when per_page is greater than total field', () => {
    const result = new SearchResult({
      items: ['entity1', 'entity2'] as any,
      total: 4,
      current_page: 1,
      per_page: 15,
      sort: 'name',
      sort_dir: 'asc',
      filter: 'test',
    });
    expect(result.last_page).toBe(1);
  });

  it('should set last_page to integer when total is not a multiple of per_page', () => {
    const result = new SearchResult({
      items: ['entity1', 'entity2'] as any,
      total: 101,
      current_page: 1,
      per_page: 20,
      sort: 'name',
      sort_dir: 'asc',
      filter: 'test',
    });
    expect(result.last_page).toBe(6);
  });
});
