import { Category } from '@/domain/category/entities/category';
import { CategoryRepository } from '@/domain/category/repositories/repository';
import { InMemorySearchableRepository } from '@/domain/common/repositories/in-memory';

export class CategoryInMemoryRepository
  extends InMemorySearchableRepository<Category>
  implements CategoryRepository {}
