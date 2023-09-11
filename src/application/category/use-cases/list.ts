import {
  PaginationOutput,
  PaginationOutputMapper,
} from '@/application/common/dtos/pagination-output';
import { SearchInput } from '@/application/common/dtos/search-input';
import CategoryRepository from '@/domain/category/repositories/repository';
import { UseCase } from '@/domain/common/application/use-case';

import { CategoryOutput, CategoryOutputMapper } from '../dtos/output';

export class ListCategoryUseCase implements UseCase<SearchInput, Output> {
  constructor(private readonly repository: CategoryRepository.Repository) {}

  async execute(input: SearchInput): Promise<Output> {
    const params = new CategoryRepository.SearchParams(input);
    const searchResult = await this.repository.search(params);

    return this.toOutput(searchResult);
  }

  private toOutput(searchResult: CategoryRepository.SearchResult): Output {
    return {
      items: searchResult.items.map(CategoryOutputMapper.toOutput),
      ...PaginationOutputMapper.toPaginationOutput(searchResult),
    };
  }
}

type Output = PaginationOutput<CategoryOutput>;
