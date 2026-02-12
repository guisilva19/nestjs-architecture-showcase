import { ValueObject } from '@/shared/domain/value-object';
import * as bcrypt from 'bcrypt';

export class Password extends ValueObject<{ value: string }> {
  private constructor(value: string) {
    super({ value });
  }

  static async create(value: string): Promise<Password> {
    const trimmed = value.trim();

    if (trimmed.length < 6) {
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
      return await bcrypt.hash(password, 10);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      throw new Error('Hashing password failed: ' + message);
    }
  }

  private static isStrong(password: string): boolean {
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
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
