import { BookModel } from "../models/book.model";
import { BorrowStatusModel } from "../models/borrow-status.model";
import { BookCategoryModel } from "../models/book-category.model";
import { BooksRepository } from "../interfaces/books.repository";
import { UuidGenerator } from "../interfaces/uuid-generator";

export interface AddBookInput {
  libraryId: string;
  title: string;
  authors: string[];
  categories: BookCategoryModel[];
}

export class AddBookUseCase {
  constructor(
    private readonly repository: BooksRepository,
    private readonly uuidGenerator: UuidGenerator
  ) {}

  async execute(input: AddBookInput): Promise<BookModel> {
    const book = new BookModel(
      this.uuidGenerator.generate(),
      input.title,
      input.authors,
      input.categories,
      BorrowStatusModel.Available,
      input.libraryId
    );

    await this.repository.save(book);

    return book;
  }
}
