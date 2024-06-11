export class LibraryId {
  private constructor(public readonly value: string) {}
  static of(value: string) {
    return new LibraryId(value);
  }
}
