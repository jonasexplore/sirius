import { Category } from '@/domain/category/entities/category';
import { InMemorySearchableRepository } from '@/domain/common/repositories/in-memory';
import CategoryRepository from 'src/domain/category/repositories/repository';

export class CategoryInMemoryRepository
  extends InMemorySearchableRepository<Category>
  implements CategoryRepository.Repository
{
  protected async applyFilter(
    items: Category[],
    filter: string,
  ): Promise<Category[]> {
    if (!filter) {
      return items;
    }

    return items.filter((item) =>
      item.props.name.toLowerCase().includes(filter.toLowerCase()),
    );
  }
}
