import {
  RepositoryInterface,
  SearchParams,
  SearchResult,
  SearchableRepositoryInterface,
} from './repository-contract';
import { Entity } from '../entities/entity';
import { NotFoundError } from '../errors/not-found';
import { UniqueEntityId } from '../value-objects';

export abstract class InMemoryRepository<T extends Entity>
  implements RepositoryInterface<T>
{
  items: T[] = [];

  async insert(entity: T): Promise<void> {
    this.items.push(entity);
  }

  async findById(id: string | UniqueEntityId): Promise<T> {
    const _id = `${id}`;
    return this._get(_id);
  }

  async findAll(): Promise<T[]> {
    return this.items;
  }

  async update(entity: T): Promise<void> {
    await this._get(entity.id);

    const index = this.items.findIndex((item) => item.id === entity.id);

    this.items[index] = entity;
  }

  async delete(id: string | UniqueEntityId): Promise<void> {
    const _id = `${id}`;
    await this._get(_id);

    const index = this.items.findIndex((item) => item.id === id);

    this.items.splice(index, 1);
  }

  protected async _get(id: string): Promise<T> {
    const item: T = this.items.find((item) => item.id === id);

    if (!item) {
      throw new NotFoundError(`Entity not found using id: ${id}`);
    }

    return item;
  }
}

export abstract class InMemorySearchableRepository<E extends Entity>
  extends InMemoryRepository<E>
  implements SearchableRepositoryInterface<E>
{
  sortableFields: string[] = [];

  async search(props: SearchParams): Promise<SearchResult<E>> {
    const filteredItems = await this.applyFilter(this.items, props.filter);
    const sortedItems = await this.applySort(
      filteredItems,
      props.sort,
      props.sort_dir,
    );
    const paginatedItems = await this.applyPaginate(
      sortedItems,
      props.page,
      props.per_page,
    );

    return new SearchResult({
      items: paginatedItems,
      total: filteredItems.length,
      current_page: props.page,
      per_page: props.per_page,
      sort: props.sort,
      sort_dir: props.sort_dir,
      filter: props.filter,
    });
  }

  protected abstract applyFilter(
    items: E[],
    filter: string | null,
  ): Promise<E[]>;

  protected async applySort(
    items: E[],
    sort: string | null,
    sort_dir: string | null,
  ): Promise<E[]> {
    if (!(sort && this.sortableFields.includes(sort))) {
      return items;
    }

    return [...items].sort((a, b) => {
      if (a.props[sort] < b.props[sort]) {
        return sort_dir === 'asc' ? -1 : 1;
      }

      if (a.props[sort] > b.props[sort]) {
        return sort_dir === 'asc' ? 1 : -1;
      }

      return 0;
    });
  }

  protected async applyPaginate(
    items: E[],
    page: SearchParams['page'],
    per_page: SearchParams['per_page'],
  ): Promise<E[]> {
    const start = (page - 1) * per_page;
    const limit = start + per_page;
    return items.slice(start, limit);
  }
}
