export class CreateUserDto {
  readonly name: string;
  readonly email: string;
  readonly phone: string;
  readonly password: string;

  constructor(props: CreateUserDto) {
    this.name = props.name;
    this.email = props.email;
    this.phone = props.phone;
    this.password = props.password;
  }
}
