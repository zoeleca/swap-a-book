import { BookModel } from "../models/book.model";
import { BooksRepository } from "../interfaces/books.repository";

export class ListAllBooksUseCase {
  constructor(private readonly repository: BooksRepository) {}

  async execute(libraryId: string): Promise<BookModel[]> {
    const books = this.repository.listAllBooks(libraryId);
    return books || [];
  }
}
