import {
  SearchParams as DefaultSearchParams,
  SearchResult as DefaultSearchResult,
  SearchableRepositoryInterface,
} from '../../common/repositories/repository-contract';
import { Category } from '../entities/category';

// eslint-disable-next-line @typescript-eslint/no-namespace
namespace CategoryRepository {
  export class SearchParams extends DefaultSearchParams<string> {}

  export class SearchResult extends DefaultSearchResult<Category, string> {}

  export type Repository = SearchableRepositoryInterface<
    Category,
    string,
    SearchParams,
    SearchResult
  >;
}

export default CategoryRepository;
