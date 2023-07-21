import { CategoryRepository } from 'src/category/domain/repositories/repository';
import { Category } from '../../../category/domain/entities/category';
import { InMemorySearchableRepository } from '../../../common/domain/repositories/in-memory';

export class CategoryInMemoryRepository
  extends InMemorySearchableRepository<Category>
  implements CategoryRepository {}
