import { SearchableRepositoryInterface } from '../../common/repositories/repository-contract';
import { Category } from '../entities/category';

export type CategoryRepository = SearchableRepositoryInterface<
  Category,
  any,
  any
>;
