import { ValueObject } from '@/shared/domain/value-object';

class TestValueObject extends ValueObject<{ value: string }> {
  constructor(value: string) {
    super({ value });
  }
}

describe('ValueObject', () => {
  describe('equals', () => {
    it('should return true for same instance', () => {
      const vo = new TestValueObject('test');
      expect(vo.equals(vo)).toBe(true);
    });

    it('should return true for same values', () => {
      const valueObject1 = new TestValueObject('test');
      const valueObject2 = new TestValueObject('test');
      expect(valueObject1.equals(valueObject2)).toBe(true);
    });

    it('should return false for different values', () => {
      const valueObject1 = new TestValueObject('test');
      const valueObject2 = new TestValueObject('test2');
      expect(valueObject1.equals(valueObject2)).toBe(false);
    });

    it('should return false for null', () => {
      const valueObject1 = new TestValueObject('test');
      expect(valueObject1.equals(null)).toBe(false);
    });

    it('should return false for undefined', () => {
      const valueObject1 = new TestValueObject('test');
      expect(valueObject1.equals(undefined)).toBe(false);
    });
  });
});
