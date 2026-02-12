import { ValueObject } from '@/shared/domain/value-object';

export class Phone extends ValueObject<{ value: string }> {
  constructor(value: string) {
    const trimmed = value.trim();

    const cleaned = trimmed.replace(/[^\d+]/g, '');

    const phoneRegex = /^\+\d{1,3}\d{6,14}$/;

    if (!phoneRegex.test(cleaned)) {
      throw new Error('Telefone inválido');
    }

    super({ value: cleaned });
  }

  get value(): string {
    return this.props.value;
  }
}
