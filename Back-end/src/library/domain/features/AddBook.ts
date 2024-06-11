import { Book } from "../model/Book";
import { BorrowStatus } from "../model/BorrowStatus";
import { UUIDGenerator } from "../ports/UUIDGenerator";
import { BooksRepository } from "../ports/BooksRepository";
import { BookCategory } from "../model/BookCategory";

export interface AddBookInput {
  libraryId: string;
  title: string;
  authors: string[];
  categories: BookCategory[];
}

export class AddBook {
  constructor(
    private readonly repository: BooksRepository,
    private readonly uuidGenerator: UUIDGenerator
  ) {}
  async execute(input: AddBookInput): Promise<Book> {
    const book = new Book(
      this.uuidGenerator.generate(),
      input.title,
      input.authors,
      input.categories,
      BorrowStatus.Availaible
    );

    this.repository.save(book);

    return book;
  }
}
