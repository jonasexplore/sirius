import { Controller, Get } from '@nestjs/common';

import { CategoryService } from '../../category.service';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get('/')
  async create(): Promise<void> {
    return this.categoryService.create();
  }
}
