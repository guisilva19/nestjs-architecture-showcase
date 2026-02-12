import { randomUUID } from 'node:crypto';

export abstract class BaseEntity {
  protected readonly _id: string;
  protected readonly _createdAt: Date;
  protected _updatedAt: Date;

  constructor(id?: string) {
    this._id = id ?? randomUUID();
    const now = new Date();
    this._createdAt = now;
    this._updatedAt = now;
  }

  get id(): string {
    return this._id;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  get updatedAt(): Date {
    return this._updatedAt;
  }

  protected touch(): void {
    this._updatedAt = new Date();
  }

  equals(other?: BaseEntity | null): boolean {
    if (other === this) {
      return true;
    }

    if (!other) {
      return false;
    }

    return this.id === other.id;
  }
}
