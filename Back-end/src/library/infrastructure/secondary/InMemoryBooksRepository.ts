import { Book } from "../../domain/model/Book";
import { BooksRepository } from "../../domain/ports/BooksRepository";

export class InMemoryBooksRepository implements BooksRepository {
  public books = new Map<string, Book>();

  async save(book: Book): Promise<void> {
    this.books.set(book.id, book);
  }
}
