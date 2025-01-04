import { BookModel } from "../../domain/library/models/book.model";
import { BooksRepository } from "../../domain/library/interfaces/books.repository";

export class InMemoryBooksRepository implements BooksRepository {
  public books = new Map<string, BookModel>();

  async save(book: BookModel): Promise<void> {
    this.books.set(book.id, book);
  }

  async delete(book: BookModel): Promise<void> {
    this.books.delete(book.id);
  }

  async getById(id: string): Promise<BookModel | undefined> {
    return this.books.get(id);
  }

  async listAllBooks(libraryId: string): Promise<BookModel[]> {
    return Array.from(this.books.values()).filter(
      (book) => book.libraryId === libraryId
    );
  }
}
