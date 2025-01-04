import { BookCategoryModel } from "./book-category.model";
import { BorrowStatusModel } from "./borrow-status.model";

export class BookModel {
  //todo : builder

  constructor(
    public readonly id: string,
    public readonly title: string,
    public readonly authors: string[],
    public readonly categories: BookCategoryModel[],
    public readonly borrowStatus: BorrowStatusModel,
    public readonly libraryId: string
  ) {}
}
