import { Password } from '@/modules/users/domain/value-objects/password.vo';

describe('Password Value Object', () => {
  describe('create', () => {
    it('should create a valid strong password and hash it', async () => {
      const password = await Password.create('Strong123');
      expect(password.hashedValue).toBeDefined();
      expect(typeof password.hashedValue).toBe('string');
      expect(password.hashedValue.length).toBeGreaterThan(0);
    });

    it('should throw error for too short password', async () => {
      await expect(Password.create('Str1')).rejects.toThrow('Senha inválida');
    });

    it('should throw error for empty password', async () => {
      await expect(Password.create('')).rejects.toThrow('Senha inválida');
    });

    it('should throw error for password without uppercase', async () => {
      await expect(Password.create('weak123')).rejects.toThrow(
        'Senha inválida',
      );
    });

    it('should throw error for password without lowercase', async () => {
      await expect(Password.create('WEAK123')).rejects.toThrow(
        'Senha inválida',
      );
    });

    it('should throw error for password without numbers', async () => {
      await expect(Password.create('WeakPass')).rejects.toThrow(
        'Senha inválida',
      );
    });

    it('should throw error for password with only numbers', async () => {
      await expect(Password.create('12345678')).rejects.toThrow(
        'Senha inválida',
      );
    });
  });

  describe('fromHash', () => {
    it('should create password from existing hash', () => {
      const hash = 'abc123def456';
      const password = Password.fromHash(hash);
      expect(password.hashedValue).toBe(hash);
    });

    it('should throw error for empty hash', () => {
      expect(() => Password.fromHash('')).toThrow('Hash inválido');
    });

    it('should be equal when created from same hash', () => {
      const hash = 'abc123def456';
      const password1 = Password.fromHash(hash);
      const password2 = Password.fromHash(hash);
      expect(password1.equals(password2)).toBe(true);
    });
  });

  describe('verify', () => {
    it('should return true for correct password', async () => {
      const password = await Password.create('Strong123');
      expect(await password.verify('Strong123')).toBe(true);
    });

    it('should return false for incorrect password', async () => {
      const password = await Password.create('Strong123');
      expect(await password.verify('Wrong123')).toBe(false);
    });

    it('should return false for empty password', async () => {
      const password = await Password.create('Strong123');
      expect(await password.verify('')).toBe(false);
    });
  });
});
