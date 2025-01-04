import { BookModel } from "./book.model";
import { LibraryIdModel } from "./library-id.model";

export class LibraryModel {
  private shelf: BookModel[] = [];

  constructor(public readonly id: LibraryIdModel) {}

  books(): BookModel[] {
    return [...this.shelf];
  }

  add(book: BookModel): void {
    this.shelf.push(book);
  }

  remove(book: BookModel) {
    this.shelf = this.shelf.filter((b) => b !== book);
  }

  findBookByTitle(title: string) {
    return this.shelf.find((book) => book.title === title);
  }
}
