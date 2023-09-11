import CategoryRepository from '@/domain/category/repositories/repository';
import { UseCase } from '@/domain/common/application/use-case';

import { CategoryOutput, CategoryOutputMapper } from '../dtos/output';

export class UpdateCategoryUseCase implements UseCase<Input, CategoryOutput> {
  constructor(private readonly repository: CategoryRepository.Repository) {}

  async execute(input: Input): Promise<CategoryOutput> {
    const entity = await this.repository.findById(input.id);
    entity.update(input.name, input.description);

    if (input.isActive === true) {
      entity.activate();
    }

    if (input.isActive === false) {
      entity.deactivate();
    }

    await this.repository.update(entity);

    return CategoryOutputMapper.toOutput(entity);
  }
}

type Input = {
  id: string;
  name: string;
  description?: string;
  isActive?: boolean;
};
