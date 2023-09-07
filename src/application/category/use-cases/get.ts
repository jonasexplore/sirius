import CategoryRepository from '@/domain/category/repositories/repository';
import { UseCase } from '@/domain/common/application/use-case';

import { CategoryOutput } from '../dtos/output';

export class GetCategoryUseCase implements UseCase<Input, CategoryOutput> {
  constructor(private readonly repository: CategoryRepository.Repository) {}

  async execute({ id }: Input): Promise<CategoryOutput> {
    const entity = await this.repository.findById(id);

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
  id: string;
};
