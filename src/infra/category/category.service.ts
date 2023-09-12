import { Injectable } from '@nestjs/common';

@Injectable()
export class CategoryService {
  async create(): Promise<any> {
    return {
      message: 'hello world',
    };
  }
}
