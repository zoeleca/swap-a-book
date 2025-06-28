import { BookModel } from "../models/book.model";

export type BookWithOwner = BookModel & {
  library: {
    user: {
      name: string;
      auth0Id: string;
    };
  };
};

export interface BooksRepository {
  save(book: BookModel): Promise<void>;

  delete(book: BookModel): Promise<void>;

  update(id: string, book: BookModel): Promise<BookModel>;

  getById(id: string): Promise<BookWithOwner | undefined>;

  searchBooks(query: string): Promise<BookModel[]>;

  listLibraryBooks(libraryId: string): Promise<BookModel[]>;

  listAllBooks(): Promise<BookModel[]>;

  createFakeUserAndLibrary(auth0Id: string): Promise<{ libraryId: string }>;
}
