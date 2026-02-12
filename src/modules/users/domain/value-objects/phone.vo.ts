import { ValueObject } from '@/shared/domain/value-object';

const PHONE_REGEX = /^\+\d{1,3}\d{6,14}$/;
const CLEAN_PHONE_REGEX = /[^\d+]/g;

export class Phone extends ValueObject<{ value: string }> {
  constructor(value: string) {
    const trimmed = value.trim();

    const cleaned = trimmed.replace(CLEAN_PHONE_REGEX, '');

    if (!PHONE_REGEX.test(cleaned)) {
      throw new Error('Telefone inválido');
    }

    super({ value: cleaned });
  }

  get value(): string {
    return this.props.value;
  }
}
