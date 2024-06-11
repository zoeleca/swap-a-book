import { Book } from "./Book";
import { LibraryId } from "./LibraryId";

export class Library {
  private shelf: Book[] = [];

  books(): Book[] {
    return [...this.shelf];
  }

  add(book: Book) {
    this.shelf.push(book);
  }
  constructor(public readonly id: LibraryId) {}
}
