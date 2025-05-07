import {BookModel} from "../models/book.model";

export interface BooksRepository {
  save(book: BookModel): Promise<void>;

  delete(book: BookModel): Promise<void>;

  getById(id: string): Promise<BookModel | undefined>;

  findUserByAuth0Id(auth0Id: string): Promise<{ libraryId: string } | null>;

  listLibraryBooks(libraryId: string): Promise<BookModel[]>;

  listAllBooks(): Promise<BookModel[]>;
}
