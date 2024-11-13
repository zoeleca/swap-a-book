import {Book} from "../model/Book";
import {BooksRepository} from "../ports/BooksRepository";


export class ListAllBooks {
  constructor(
    private readonly repository: BooksRepository,
  ) {
  }

  async execute(libraryId: string): Promise<Book[]> {
    const books = this.repository.listAllBooks(libraryId);
    return books || [];
  }
}
