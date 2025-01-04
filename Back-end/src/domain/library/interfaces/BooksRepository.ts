import { Book } from "../models/Book";

export interface BooksRepository {
  save(book: Book): Promise<void>;

  delete(book: Book): Promise<void>;

  getById(id: string): Promise<Book | undefined>;

  listAllBooks(libraryId: string): Promise<Book[]>;
}
