import { Entity } from '../entities/entity';
import { UniqueEntityId } from '../value-objects';

export interface RepositoryInterface<T extends Entity> {
  insert(entity: T): Promise<void>;
  findById(id: string | UniqueEntityId): Promise<T>;
  findAll(): Promise<T[]>;
  update(entity: T): Promise<void>;
  delete(id: string | UniqueEntityId): Promise<void>;
}

export type SortDirection = 'asc' | 'desc';
export type SearchProps<Filter = string> = {
  page: number;
  per_page: number;
  sort: string | null;
  sort_dir: SortDirection | null;
  filter: Filter | null;
};
export class SearchParams {
  protected _page = 1;
  protected _per_page = 15;
  protected _sort: string | null;
  protected _sort_dir: SortDirection | null;
  protected _filter: string | null;

  constructor(props: Partial<SearchProps>) {
    this.page = props.page;
    this.per_page = props.per_page;
    this.sort = props.sort;
    this.sort_dir = props.sort_dir;
    this.filter = props.filter;
  }

  get page() {
    return this._page;
  }

  private set page(value: number) {
    let _page = +value;

    if (Number.isNaN(_page) || _page < 1 || parseInt(String(_page)) !== _page) {
      _page = 1;
    }

    this._page = _page;
  }

  get per_page() {
    return this._per_page;
  }

  private set per_page(value: number) {
    let _per_page = +value;

    if (
      Number.isNaN(_per_page) ||
      _per_page < 1 ||
      parseInt(String(_per_page)) !== _per_page
    ) {
      _per_page = 1;
    }

    this._per_page = _per_page;
  }

  get sort() {
    return this._sort;
  }

  private set sort(value: string | null) {
    this._sort =
      value === null || value === undefined || value === '' ? null : `${value}`;
  }

  get sort_dir() {
    return this._sort_dir;
  }

  private set sort_dir(value: SortDirection | null) {
    if (!this.sort) {
      this._sort_dir = null;
      return;
    }

    const dir = String(value).toLowerCase();
    this._sort_dir = dir !== 'asc' && dir !== 'desc' ? 'asc' : dir;
  }

  get filter() {
    return this._filter;
  }

  private set filter(value: string | null) {
    this._filter =
      value === null || value === undefined || value === '' ? null : `${value}`;
  }
}

export interface SearchableRepositoryInterface<
  E extends Entity,
  SearchInput,
  SearchOutput,
> extends RepositoryInterface<E> {
  search(props: SearchInput): Promise<SearchOutput>;
}
