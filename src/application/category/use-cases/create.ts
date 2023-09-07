import { Category } from '@/domain/category/entities/category';
import CategoryRepository from '@/domain/category/repositories/repository';
import { UseCase } from '@/domain/common/application/use-case';

import { CategoryOutput } from '../dtos/output';

export class CreateCategoryUseCase implements UseCase<Input, CategoryOutput> {
  constructor(private readonly repository: CategoryRepository.Repository) {}

  async execute(input: Input): Promise<CategoryOutput> {
    const entity = new Category(input);

    await this.repository.insert(entity);

    return {
      id: entity.id,
      name: entity.name,
      description: entity.description,
      isActive: entity.isActive,
      createdAt: entity.createdAt,
    };
  }
}

export type Input = {
  name: string;
  description?: string;
  isActive?: boolean;
};
