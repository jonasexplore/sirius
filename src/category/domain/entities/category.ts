import { Entity } from '../../../common/domain/entities/entity';
import { UniqueEntityId } from '../../../common/domain/value-objects';
import CategoryValidatorFactory from '../validators/category';

export type CategoryProps = {
  name: string;
  description?: string;
  isActive?: boolean;
  createdAt?: Date;
};

export class Category extends Entity<CategoryProps> {
  constructor(public readonly props: CategoryProps, id?: UniqueEntityId) {
    Category.validate(props);

    super(props, id);

    this.props.description = this.props.description ?? null;
    this.props.isActive = this.props.isActive ?? true;
    this.props.createdAt = this.props.createdAt ?? new Date();
  }

  update(name: string, description: string) {
    Category.validate({ name, description });

    this.name = name;
    this.description = description;
  }

  // static validate(props: Omit<CategoryProps, 'createdAt'>) {
  //   ValidatorRules.values(props.name, 'name').required().string();
  //   ValidatorRules.values(props.description, 'description').string();
  //   ValidatorRules.values(props.isActive, 'isActive').boolean();
  // }

  static validate(props: CategoryProps) {
    const validator = CategoryValidatorFactory.create();
    validator.validate(props);
  }

  activate() {
    this.isActive = true;
  }

  deactivate() {
    this.isActive = false;
  }

  get name() {
    return this.props.name;
  }

  private set name(value: string) {
    this.props.name = value;
  }

  get description() {
    return this.props.description;
  }

  private set description(value: string) {
    this.props.description = value ?? null;
  }

  get isActive() {
    return this.props.isActive;
  }

  private set isActive(value: boolean) {
    this.props.isActive = value ?? true;
  }

  get createdAt() {
    return this.props.createdAt;
  }
}
