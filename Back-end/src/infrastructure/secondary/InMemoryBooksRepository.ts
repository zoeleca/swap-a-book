import {Book} from "../../domain/library/model/Book";
import {BooksRepository} from "../../domain/library/ports/BooksRepository";

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
  async listAllBooks(): Promise<Book[]> {
    return Array.from(this.books.values());
  }
  async deleteAll(): Promise<void> {
    this.books.clear();
  }
}
