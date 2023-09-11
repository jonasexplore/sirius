import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

import { ClassValidatorFields } from '@/domain/common/validators/class-validator-fields';

import { CategoryProps } from '../entities/category';

export class CategoryRules {
  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  @IsDate()
  @IsOptional()
  createdAt?: Date;

  constructor({ name, createdAt, description, isActive }: CategoryProps) {
    Object.assign(this, { name, createdAt, description, isActive });
  }
}

export class CategoryValidator extends ClassValidatorFields<CategoryRules> {
  validate(data: CategoryRules): boolean {
    return super.validate(new CategoryRules(data ?? ({} as CategoryProps)));
  }
}

export default class CategoryValidatorFactory {
  static create() {
    return new CategoryValidator();
  }
}
