import {BookModel} from "../../../../../../src/domain/library/models/book.model";
import {BookCategoriesModel} from "../../../../../../src/domain/library/models/book-categories.model";
import {BorrowStatusModel} from "../../../../../../src/domain/library/models/borrow-status.model";
import {randomUUID} from "node:crypto";
import {BookLanguagesModel} from "../../../../../../src/domain/library/models/book-languages.model";
import {BookStatusModel} from "../../../../../../src/domain/library/models/book-status.model";

export function harryPotter() {
  return new BookModel(
    randomUUID(),
    "Harry Potter",
    ["J.K Rowling"],
    [
      BookCategoriesModel.Fiction,
      BookCategoriesModel.Fantasy,
      BookCategoriesModel.ChildrenStory,
    ],
    [BookLanguagesModel.French],
    BorrowStatusModel.Available,
    BookStatusModel.Visible,
    "9d7f9732-4c9b-4f97-8da3-b12859c276a"
  );
}

export function lordOfTheRings() {
  return new BookModel(
    randomUUID(),
    "Lord of the Ring",
    ["Tolkien"],
    [
      BookCategoriesModel.Fiction,
      BookCategoriesModel.Mystery,
      BookCategoriesModel.Adventure,
    ], [BookLanguagesModel.French],
    BorrowStatusModel.Available,
    BookStatusModel.Visible,
    "9d7f9732-4c9b-4f97-8da3-b12859c276a"
  );
}

export function sherlockHolmes() {
  return new BookModel(
    randomUUID(),
    "sherlock Holmes",
    ["Conan Doyle"],
    [
      BookCategoriesModel.Fiction,
      BookCategoriesModel.Mystery,
      BookCategoriesModel.Crime,
      BookCategoriesModel.Detective,
    ],
    [BookLanguagesModel.French],
    BorrowStatusModel.Available,
    BookStatusModel.Visible,
    "9d7f9732-4c9b-4f97-8da3-b12859c276a"
  );
}

export function lesMemoires() {
  return new BookModel(
    randomUUID(),
    "les Memoires d'un chat",
    ["Hiro Arikawa"],
    [
      BookCategoriesModel.Fiction,
      BookCategoriesModel.Novel,
      BookCategoriesModel.Adventure,
    ], [BookLanguagesModel.French],
    BorrowStatusModel.Available,
    BookStatusModel.Visible,
    "9d7f9732-4c9b-4f97-8da3-b12859c276a"
  );
}
