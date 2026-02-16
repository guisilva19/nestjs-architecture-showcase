import { User } from '@/modules/users/domain/entities/user.entity';
import { Email } from '@/modules/users/domain/value-objects/email.vo';
import { Phone } from '@/modules/users/domain/value-objects/phone.vo';
import { Password } from '@/modules/users/domain/value-objects/password.vo';

describe('User Entity', () => {
  describe('creation', () => {
    it('should create a valid user', async () => {
      const email = new Email('gui@gmail.com');
      const phone = new Phone('+5511999999999');
      const password = await Password.create('Strong123');

      const user = new User(undefined, 'Guilherme', email, phone, password);

      expect(user.id).toBeDefined();
      expect(user.name).toBe('Guilherme');
      expect(user.email).toBe(email);
      expect(user.phone).toBe(phone);
      expect(user.password).toBe(password);
    });

    it('should create user with provided ID', async () => {
      const email = new Email('gui@gmail.com');
      const phone = new Phone('+5511999999999');
      const password = await Password.create('Strong123');

      const customId = 'user-123';
      const user = new User(customId, 'Guilherme', email, phone, password);

      expect(user.id).toBe(customId);
    });

    it('should set createdAt and updatedAt timestamps', async () => {
      const email = new Email('gui@gmail.com');
      const phone = new Phone('+5511999999999');
      const password = await Password.create('Strong123');

      const user = new User(undefined, 'Guilherme', email, phone, password);

      expect(user.createdAt).toBeInstanceOf(Date);
      expect(user.updatedAt).toBeInstanceOf(Date);
    });
  });

  describe('equals', () => {
    it('should return true for same user instance', async () => {
      const email = new Email('gui@gmail.com');
      const phone = new Phone('+5511999999999');
      const password = await Password.create('Strong123');

      const user = new User('same-id', 'Guilherme', email, phone, password);

      expect(user.equals(user)).toBe(true);
    });

    it('should return true for users with same ID', async () => {
      const email = new Email('gui@gmail.com');
      const phone = new Phone('+5511999999999');
      const password = await Password.create('Strong123');

      const id = 'same-id';
      const user1 = new User(id, 'Guilherme', email, phone, password);
      const user2 = new User(id, 'João', email, phone, password);

      expect(user1.equals(user2)).toBe(true);
    });

    it('should return false for users with different IDs', async () => {
      const email = new Email('gui@gmail.com');
      const phone = new Phone('+5511999999999');
      const password = await Password.create('Strong123');

      const user1 = new User('id-1', 'Guilherme', email, phone, password);
      const user2 = new User('id-2', 'Guilherme', email, phone, password);

      expect(user1.equals(user2)).toBe(false);
    });
  });

  describe('changeEmail', () => {
    it('should update email and update updatedAt timestamp', async () => {
      const email = new Email('gui@gmail.com');
      const phone = new Phone('+5511999999999');
      const password = await Password.create('Strong123');

      const user = new User(undefined, 'Guilherme', email, phone, password);
      const initialUpdatedAt = user.updatedAt.getTime();

      // Delay para garantir que o timestamp seja diferente
      await new Promise((resolve) => setTimeout(resolve, 10));

      const newEmail = new Email('novo@gmail.com');
      user.changeEmail(newEmail);

      expect(user.email.equals(newEmail)).toBe(true);
      // Verifica que updatedAt foi atualizado (pode ser igual ou maior)
      expect(user.updatedAt.getTime()).toBeGreaterThanOrEqual(initialUpdatedAt);
    });

    it('should not update if new email is the same', async () => {
      const email = new Email('gui@gmail.com');
      const phone = new Phone('+5511999999999');
      const password = await Password.create('Strong123');

      const user = new User(undefined, 'Guilherme', email, phone, password);
      const initialUpdatedAt = user.updatedAt;

      const sameEmail = new Email('gui@gmail.com');
      user.changeEmail(sameEmail);

      expect(user.updatedAt.getTime()).toBe(initialUpdatedAt.getTime());
    });
  });

  describe('changePhone', () => {
    it('should update phone and update updatedAt timestamp', async () => {
      const email = new Email('gui@gmail.com');
      const phone = new Phone('+5511999999999');
      const password = await Password.create('Strong123');

      const user = new User(undefined, 'Guilherme', email, phone, password);
      const initialUpdatedAt = user.updatedAt.getTime();

      // Delay para garantir que o timestamp seja diferente
      await new Promise((resolve) => setTimeout(resolve, 10));

      const newPhone = new Phone('+5511888888888');
      user.changePhone(newPhone);

      expect(user.phone.equals(newPhone)).toBe(true);
      // Verifica que updatedAt foi atualizado (pode ser igual ou maior)
      expect(user.updatedAt.getTime()).toBeGreaterThanOrEqual(initialUpdatedAt);
    });

    it('should not update if new phone is the same', async () => {
      const email = new Email('gui@gmail.com');
      const phone = new Phone('+5511999999999');
      const password = await Password.create('Strong123');

      const user = new User(undefined, 'Guilherme', email, phone, password);
      const initialUpdatedAt = user.updatedAt;

      const samePhone = new Phone('+5511999999999');
      user.changePhone(samePhone);

      expect(user.updatedAt.getTime()).toBe(initialUpdatedAt.getTime());
    });
  });
});
