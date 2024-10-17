import { Book } from "../model/Book";
import { BooksRepository } from "../ports/BooksRepository";


export class ListAllBooks {
  constructor(
    private readonly repository: BooksRepository,
  ) {}
  async execute(): Promise<Book[]> {
   const books =  this.repository.listAllBooks();
   return books || [];
  }
}
