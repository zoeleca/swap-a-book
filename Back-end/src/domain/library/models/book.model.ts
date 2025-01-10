import { BookCategoriesModel } from "./book-categories.model";
import { BorrowStatusModel } from "./borrow-status.model";
import { BookLanguagesModel } from "./book-languages.model";
import { BookStatusModel } from "./book-status.model";

export class BookModel {
  //todo : builder

  constructor(
    public readonly id: string,
    public readonly title: string,
    public readonly authors: string[],
    public readonly categories: BookCategoriesModel[],
    public readonly languages: BookLanguagesModel[],
    public readonly borrowStatus: BorrowStatusModel,
    public readonly status: BookStatusModel,
    public readonly libraryId: string
  ) {}
}
