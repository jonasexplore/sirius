import { Module } from '@nestjs/common';

import { CategoryService } from './category.service';
import { CategoryController } from './http/controllers/category.controller';

@Module({
  controllers: [CategoryController],
  providers: [CategoryService],
  exports: [],
})
export class CategoryModule {}
