import { Book } from "../models/Book";
import { BooksRepository } from "../interfaces/BooksRepository";

export class ListAllBooks {
  constructor(private readonly repository: BooksRepository) {}

  async execute(libraryId: string): Promise<Book[]> {
    const books = this.repository.listAllBooks(libraryId);
    return books || [];
  }
}
