import { BookModel } from "../models/book.model";
import { BorrowStatusModel } from "../models/borrow-status.model";
import { BookCategoriesModel } from "../models/book-categories.model";
import { BooksRepository } from "../interfaces/books.repository";
import { UuidGenerator } from "../interfaces/uuid-generator";
import { BookLanguagesModel } from "../models/book-languages.model";
import { BookStatusModel } from "../models/book-status.model";

export interface AddBookInput {
  libraryId: string;
  title: string;
  authors: string[];
  categories: BookCategoriesModel[];
  languages: BookLanguagesModel[];
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
      input.languages,
      BorrowStatusModel.Available,
      BookStatusModel.Visible,
      input.libraryId
    );

    await this.repository.save(book);

    return book;
  }
}
