import { BookModel } from "../../../../../../src/domain/library/models/book.model";
import { BookCategoryModel } from "../../../../../../src/domain/library/models/book-category.model";
import { BorrowStatusModel } from "../../../../../../src/domain/library/models/borrow-status.model";
import { randomUUID } from "node:crypto";

export function harryPotter() {
  return new BookModel(
    randomUUID(),
    "Harry Potter",
    ["J.K Rowling"],
    [
      BookCategoryModel.Fiction,
      BookCategoryModel.Fantasy,
      BookCategoryModel.ChildrenStory,
    ],
    BorrowStatusModel.Available,
    "9d7f9732-4c9b-4f97-8da3-b12859c276a"
  );
}

export function lordOfTheRings() {
  return new BookModel(
    randomUUID(),
    "Lord of the Ring",
    ["Tolkien"],
    [
      BookCategoryModel.Fiction,
      BookCategoryModel.Mystery,
      BookCategoryModel.Adventure,
    ],
    BorrowStatusModel.Borrowed,
    "9d7f9732-4c9b-4f97-8da3-b12859c276a"
  );
}

export function sherlockHolmes() {
  return new BookModel(
    randomUUID(),
    "sherlock Holmes",
    ["Conan Doyle"],
    [
      BookCategoryModel.Fiction,
      BookCategoryModel.Mystery,
      BookCategoryModel.Crime,
      BookCategoryModel.Detective,
    ],
    BorrowStatusModel.Borrowed,
    "9d7f9732-4c9b-4f97-8da3-b12859c276a"
  );
}

export function lesMemoires() {
  return new BookModel(
    randomUUID(),
    "les Memoires d'un chat",
    ["Hiro Arikawa"],
    [
      BookCategoryModel.Fiction,
      BookCategoryModel.Novel,
      BookCategoryModel.Adventure,
    ],
    BorrowStatusModel.Borrowed,
    "9d7f9732-4c9b-4f97-8da3-b12859c276a"
  );
}
