import { randomUUID } from 'node:crypto';

export abstract class BaseEntity {
  public readonly id: string;
  public readonly createdAt: Date;
  public updatedAt: Date;

  constructor(id?: string) {
    this.id = id ?? randomUUID();
    const now = new Date();
    this.createdAt = now;
    this.updatedAt = now;
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
