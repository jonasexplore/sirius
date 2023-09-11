import { SortDirection } from '@/domain/common/repositories/repository-contract';

export type SearchInput<Filter = string> = Partial<{
  page: number;
  per_page: number;
  sort: string | null;
  sort_dir: SortDirection | null;
  filter: Filter | null;
}>;
