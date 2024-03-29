import { Category } from '@/domain/category/entities/category';
import CategoryRepository from '@/domain/category/repositories/repository';
import { UseCase } from '@/domain/common/application/use-case';

import { CategoryOutput, CategoryOutputMapper } from '../dtos/output';

export class CreateCategoryUseCase implements UseCase<Input, CategoryOutput> {
  constructor(private readonly repository: CategoryRepository.Repository) {}

  async execute(input: Input): Promise<CategoryOutput> {
    const entity = new Category(input);
    await this.repository.insert(entity);

    return CategoryOutputMapper.toOutput(entity);
  }
}

type Input = {
  name: string;
  description?: string;
  isActive?: boolean;
};
