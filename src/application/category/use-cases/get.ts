import CategoryRepository from '@/domain/category/repositories/repository';
import { UseCase } from '@/domain/common/application/use-case';

import { CategoryOutput, CategoryOutputMapper } from '../dtos/output';

export class GetCategoryUseCase implements UseCase<Input, CategoryOutput> {
  constructor(private readonly repository: CategoryRepository.Repository) {}

  async execute({ id }: Input): Promise<CategoryOutput> {
    const entity = await this.repository.findById(id);

    return CategoryOutputMapper.toOutput(entity);
  }
}

type Input = {
  id: string;
};
