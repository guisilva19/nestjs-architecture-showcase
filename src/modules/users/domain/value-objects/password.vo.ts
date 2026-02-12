import { ValueObject } from '@/shared/domain/value-object';
import * as bcrypt from 'bcrypt';

export class Password extends ValueObject<{ value: string }> {
  private static readonly MIN_PASSWORD_LENGTH = 6;
  private static readonly BCRYPT_SALT_ROUNDS = 10;
  private static readonly UPPERCASE_REGEX = /[A-Z]/;
  private static readonly LOWERCASE_REGEX = /[a-z]/;
  private static readonly NUMBER_REGEX = /[0-9]/;

  private constructor(value: string) {
    super({ value });
  }

  static async create(value: string): Promise<Password> {
    const trimmed = value.trim();

    if (trimmed.length < Password.MIN_PASSWORD_LENGTH) {
      throw new Error('Senha inválida');
    }

    if (!Password.isStrong(trimmed)) {
      throw new Error('Senha inválida');
    }

    const hashedPassword = await Password.hash(trimmed);
    return new Password(hashedPassword);
  }

  static fromHash(hash: string): Password {
    if (!hash || hash.trim().length === 0) {
      throw new Error('Hash inválido');
    }
    return new Password(hash);
  }

  private static async hash(password: string): Promise<string> {
    try {
      return await bcrypt.hash(password, Password.BCRYPT_SALT_ROUNDS);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      throw new Error('Hashing password failed: ' + message);
    }
  }

  private static isStrong(password: string): boolean {
    const hasUpperCase = Password.UPPERCASE_REGEX.test(password);
    const hasLowerCase = Password.LOWERCASE_REGEX.test(password);
    const hasNumber = Password.NUMBER_REGEX.test(password);
    return hasUpperCase && hasLowerCase && hasNumber;
  }

  get hashedValue(): string {
    return this.props.value;
  }

  async verify(password: string): Promise<boolean> {
    if (!password) return false;
    if (!this.props.value) return false;

    return await bcrypt.compare(password, this.props.value);
  }
}
