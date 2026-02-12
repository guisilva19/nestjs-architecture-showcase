import { ValueObject } from '@/shared/domain/value-object';

export class Phone extends ValueObject<{ value: string }> {
  private static readonly PHONE_REGEX = /^\+\d{1,3}\d{6,14}$/;
  private static readonly CLEAN_PHONE_REGEX = /[^\d+]/g;

  constructor(value: string) {
    const trimmed = value.trim();

    const cleaned = trimmed.replace(Phone.CLEAN_PHONE_REGEX, '');

    if (!Phone.PHONE_REGEX.test(cleaned)) {
      throw new Error('Telefone inválido');
    }

    super({ value: cleaned });
  }

  get value(): string {
    return this.props.value;
  }
}
