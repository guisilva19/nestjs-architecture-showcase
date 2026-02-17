import { User } from '@/modules/users/domain/entities/user.entity';
import { Email } from '@/modules/users/domain/value-objects/email.vo';
import { Phone } from '@/modules/users/domain/value-objects/phone.vo';
import { Password } from '@/modules/users/domain/value-objects/password.vo';
import { InMemoryUserRepository } from '@/modules/users/infrastructure/repositories/in-memory-user.repository';

describe('InMemoryUserRepository', () => {
  it('should save and retrieve a user by id', async () => {
    const repo = new InMemoryUserRepository();

    const email = new Email('gui@gmail.com');
    const phone = new Phone('+5511999999999');
    const password = await Password.create('Strong123');

    const user = new User(undefined, 'Guilherme', email, phone, password);

    await repo.save(user);

    const found = await repo.findById(user.id);

    expect(found).not.toBeNull();
    expect(found?.id).toBe(user.id);
  });

  it('should find user by email', async () => {
    const repo = new InMemoryUserRepository();

    const email = new Email('gui@gmail.com');
    const phone = new Phone('+5511999999999');
    const password = await Password.create('Strong123');

    const user = new User(undefined, 'Guilherme', email, phone, password);

    await repo.save(user);

    const found = await repo.findByEmail(email);

    expect(found).not.toBeNull();
    expect(found?.email.value).toBe(email.value);
  });

  it('should return null when user does not exist', async () => {
    const repo = new InMemoryUserRepository();
    const email = new Email('notfound@gmail.com');

    const byId = await repo.findById('non-existent');
    const byEmail = await repo.findByEmail(email);

    expect(byId).toBeNull();
    expect(byEmail).toBeNull();
  });
});
