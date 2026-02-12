import { ValueObject } from '@/shared/domain/value-object';

export class Email extends ValueObject<{ value: string }> {
  private readonly _value: string;

  constructor(value: string) {
    const normalized = value.toLowerCase().trim();
    if (normalized.length === 0 || !normalized.includes('@')) {
      throw new Error('Email inválido');
    }
    super({ value: normalized });
    this._value = normalized;
  }

  get value(): string {
    return this._value;
  }
}
