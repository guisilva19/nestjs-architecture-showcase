import { User } from '@/modules/users/domain/entities/user.entity';
import { Email } from '@/modules/users/domain/value-objects/email.vo';
import { UserRepository } from '@/modules/users/domain/repositories/user-repository.interface';

export class InMemoryUserRepository implements UserRepository {
  private users: User[] = [];

  findById(id: string): Promise<User | null> {
    const user = this.users.find((u) => u.id === id);
    return Promise.resolve(user ?? null);
  }

  findByEmail(email: Email): Promise<User | null> {
    const user = this.users.find((u) => u.email.equals(email));
    return Promise.resolve(user ?? null);
  }

  save(user: User): Promise<void> {
    const index = this.users.findIndex((u) => u.id === user.id);

    if (index === -1) {
      this.users.push(user);
    } else {
      this.users[index] = user;
    }

    return Promise.resolve();
  }
}
