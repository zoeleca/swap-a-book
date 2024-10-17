import {Book} from "../../../../src/domain/library/model/Book";
import {BookCategory} from "../../../../src/domain/library/model/BookCategory";
import {BorrowStatus} from "../../../../src/domain/library/model/BorrowStatus";

export function harryPotter() {
  return new Book(
      "9d7f9732-4c9b-4f97-8da3-b12859c276a",
    "Harry Potter",
    ["J.K Rowling"],
    [BookCategory.Fiction, BookCategory.Fantasy, BookCategory.ChildrenStory],
    BorrowStatus.Available
  );
}

export function lordOfTheRings() {
  return new Book(
      "9d7f9732-4c9b-4f97-8da3-b12859c276a",
      "Lord of the Ring",
      ["Tolkien"],
      [BookCategory.Fiction, BookCategory.Mystery, BookCategory.Adventure],
      BorrowStatus.Borrowed
  );
}

export function sherlockHolmes() {
  return new Book(
      "9d7f9732-4c9b-4f97-8da3-b12859c276af",
      "sherlock Holmes",
      ["Conan Doyle"],
      [BookCategory.Fiction, BookCategory.Mystery, BookCategory.Crime, BookCategory.Detective],
      BorrowStatus.Borrowed
  );
}


export function lesMemoires() {
  return new Book(
      "9d7f9732-4c9b-4f97-8da3-b12859c276a",
      "les Memoires d'un chat",
      ["Hiro Arikawa"],
      [BookCategory.Fiction, BookCategory.Novel, BookCategory.Adventure],
      BorrowStatus.Borrowed
  );
}

