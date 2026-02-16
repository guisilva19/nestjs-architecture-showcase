import { BaseEntity } from '@/shared/domain/base-entity';
import { Email } from '@/modules/users/domain/value-objects/email.vo';
import { Phone } from '@/modules/users/domain/value-objects/phone.vo';
import { Password } from '@/modules/users/domain/value-objects/password.vo';

export class User extends BaseEntity {
  private _email: Email;
  private _phone: Phone;

  constructor(
    id: string | undefined,
    public readonly name: string,
    email: Email,
    phone: Phone,
    public readonly password: Password,
  ) {
    super(id);
    this._email = email;
    this._phone = phone;
  }

  get email(): Email {
    return this._email;
  }

  get phone(): Phone {
    return this._phone;
  }

  changeEmail(newEmail: Email): void {
    if (this._email.equals(newEmail)) {
      return;
    }

    this._email = newEmail;
    this.touch();
  }

  changePhone(newPhone: Phone): void {
    if (this._phone.equals(newPhone)) {
      return;
    }

    this._phone = newPhone;
    this.touch();
  }
}
