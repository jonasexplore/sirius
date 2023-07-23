import { InMemorySearchableRepository } from '@/domain/common/repositories/in-memory';
import { CategoryRepository } from 'src/domain/category/repositories/repository';

import { Category } from '../../entities/category';

export class CategoryInMemoryRepository
  extends InMemorySearchableRepository<Category>
  implements CategoryRepository {}
