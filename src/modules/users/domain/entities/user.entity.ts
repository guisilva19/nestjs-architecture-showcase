import { BaseEntity } from '@/shared/domain/base-entity';
import { Email } from '@/modules/users/domain/value-objects/email.vo';
import { Phone } from '@/modules/users/domain/value-objects/phone.vo';
import { Password } from '@/modules/users/domain/value-objects/password.vo';

export class User extends BaseEntity {
  constructor(
    id: string | undefined,
    public readonly name: string,
    public readonly email: Email,
    public readonly phone: Phone,
    public readonly password: Password,
  ) {
    super(id);
  }
}
