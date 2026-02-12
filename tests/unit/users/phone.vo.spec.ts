import { Phone } from '@/modules/users/domain/value-objects/phone.vo';

describe('Phone Value Object', () => {
  describe('creation', () => {
    it('should create a valid phone', () => {
      const phone = new Phone('+5511999999999');
      expect(phone.value).toBe('+5511999999999');
    });

    it('should throw error for invalid phone', () => {
      expect(() => new Phone('')).toThrow('Telefone inválido');
    });

    it('should be equal for same values', () => {
      const phone1 = new Phone('+5511999999999');
      const phone2 = new Phone('+5511999999999');
      expect(phone1.equals(phone2)).toBe(true);
    });

    it('should not be equal for different values', () => {
      const phone1 = new Phone('+5511999999999');
      const phone2 = new Phone('+5511999999998');
      expect(phone1.equals(phone2)).toBe(false);
    });

    it('should normalize phone number', () => {
      const phone = new Phone('+55 11 99999-9999');
      expect(phone.value).toBe('+5511999999999');
    });
  });
});
