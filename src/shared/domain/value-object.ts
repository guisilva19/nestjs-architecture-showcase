export abstract class ValueObject<TProps> {
  protected constructor(protected readonly props: TProps) {}

  equals(other?: ValueObject<TProps> | null): boolean {
    if (other === this) return true;
    if (!other) return false;

    return JSON.stringify(this.props) === JSON.stringify(other.props);
  }
}
