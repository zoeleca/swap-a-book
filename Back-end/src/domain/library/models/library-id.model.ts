export class LibraryIdModel {
  private constructor(public readonly value: string) {}

  static of(value: string) {
    return new LibraryIdModel(value);
  }
}
