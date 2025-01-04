import { BookModel } from "../models/book.model";

export interface BooksRepository {
  save(book: BookModel): Promise<void>;

  delete(book: BookModel): Promise<void>;

  getById(id: string): Promise<BookModel | undefined>;

  listAllBooks(libraryId: string): Promise<BookModel[]>;
}
