import {Book} from "../model/Book";

export interface BooksRepository {
  save(book: Book): Promise<void>;

  delete(book: Book): Promise<void>;

  findById(id: string): Promise<Book | undefined>;

  listAllBooks(libraryId: string): Promise<Book[]>;
}
