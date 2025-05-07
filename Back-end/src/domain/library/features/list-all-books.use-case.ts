import {BookModel} from "../models/book.model";
import {BooksRepository} from "../interfaces/books.repository";

export class ListAllBooksUseCase {
  constructor(private readonly repository: BooksRepository) {
  }


  public async getLibraryBook(libraryId: string): Promise<BookModel[]> {
    const books = this.repository.listLibraryBooks(libraryId);
    return books || [];
  };

  public async getAllBooks(): Promise<BookModel[]> {
    const books = this.repository.listAllBooks();
    return books || [];
  }

}
