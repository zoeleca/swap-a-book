import { Book } from "../../domain/model/Book";
import { BooksRepository } from "../../domain/ports/BooksRepository";

export class InMemoryBooksRepository implements BooksRepository {
  public books = new Map<string, Book>();

  async save(book: Book): Promise<void> {
    this.books.set(book.id, book);
  }
  async delete(book: Book): Promise<void> {
    this.books.delete(book.id);
  }
  async findById(id: string): Promise<Book | undefined> {
    return this.books.get(id);
  }
}
