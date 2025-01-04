import { Book } from "./Book";
import { LibraryId } from "./LibraryId";

export class Library {
  private shelf: Book[] = [];
  constructor(public readonly id: LibraryId) {}

  books(): Book[] {
    return [...this.shelf];
  }

  add(book: Book): void {
    this.shelf.push(book);
  }

  remove(book: Book) {
    this.shelf = this.shelf.filter(b => b !== book);
  }

  findBookByTitle(title: string) {
    return this.shelf.find(book => book.title === title);
  }
}
