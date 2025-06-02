import { BookModel } from "../models/book.model";
import { BorrowRequestModel } from "../models/borrow-request.model";

export interface BooksRepository {
  save(book: BookModel): Promise<void>;

  delete(book: BookModel): Promise<void>;

  getById(id: string): Promise<BookModel | undefined>;

  searchBooks(query: string): Promise<BookModel[]>;

  listLibraryBooks(libraryId: string): Promise<BookModel[]>;

  listAllBooks(): Promise<BookModel[]>;

  createFakeUserAndLibrary(auth0Id: string): Promise<{ libraryId: string }>;

  createBorrowRequest(request: BorrowRequestModel): Promise<BorrowRequestModel>;

}
