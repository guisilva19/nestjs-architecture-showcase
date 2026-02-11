import { BaseEntity } from '@/shared/domain/base-entity';

// Classe concreta para testar a classe abstrata
class TestEntity extends BaseEntity {
  constructor(id?: string) {
    super(id);
  }
}

describe('BaseEntity', () => {
  describe('constructor', () => {
    it('should generate an ID if not provided', () => {
      const entity = new TestEntity();

      expect(entity.id).toBeDefined();
      expect(typeof entity.id).toBe('string');
      expect(entity.id.length).toBeGreaterThan(0);
    });

    it('should use provided ID', () => {
      const customId = 'custom-id-123';
      const entity = new TestEntity(customId);

      expect(entity.id).toBe(customId);
    });

    it('should set createdAt timestamp', () => {
      const entity = new TestEntity();

      expect(entity.createdAt).toBeInstanceOf(Date);
      expect(entity.createdAt.getTime()).toBeLessThanOrEqual(Date.now());
    });

    it('should set updatedAt timestamp', () => {
      const entity = new TestEntity();

      expect(entity.updatedAt).toBeInstanceOf(Date);
      expect(entity.updatedAt.getTime()).toBeLessThanOrEqual(Date.now());
    });
  });

  describe('equals', () => {
    it('should return true for same entity', () => {
      const entity = new TestEntity('same-id');

      expect(entity.equals(entity)).toBe(true);
    });

    it('should return true for entities with same ID', () => {
      const id = 'same-id';
      const entity1 = new TestEntity(id);
      const entity2 = new TestEntity(id);

      expect(entity1.equals(entity2)).toBe(true);
    });

    it('should return false for entities with different IDs', () => {
      const entity1 = new TestEntity('id-1');
      const entity2 = new TestEntity('id-2');

      expect(entity1.equals(entity2)).toBe(false);
    });

    it('should return false for null entity', () => {
      const entity = new TestEntity();

      expect(entity.equals(null as any)).toBe(false);
    });

    it('should return false for undefined entity', () => {
      const entity = new TestEntity();

      expect(entity.equals(undefined as any)).toBe(false);
    });
  });
});
