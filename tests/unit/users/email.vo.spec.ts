import { Email } from '@/modules/users/domain/value-objects/email.vo';

describe('Email Value Object', () => {
  describe('creation', () => {
    it('should create a valid email', () => {
      const email = new Email('gui@gmail.com');
      expect(email.value).toBe('gui@gmail.com');
    });

    it('should throw error for invalid email', () => {
      expect(() => new Email('invalid')).toThrow('Email inválido');
    });

    it('should be equal for same values', () => {
      const email1 = new Email('gui@gmail.com');
      const email2 = new Email('gui@gmail.com');
      expect(email1.equals(email2)).toBe(true);
    });

    it('should normalize to lowercase', () => {
      const email = new Email('gui@GMAIL.COM');
      expect(email.value).toBe('gui@gmail.com');
    });
  });
});
