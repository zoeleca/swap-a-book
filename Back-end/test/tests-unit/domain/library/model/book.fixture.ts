import {Book} from "../../../../../src/domain/library/model/Book";
import {BookCategory} from "../../../../../src/domain/library/model/BookCategory";
import {BorrowStatus} from "../../../../../src/domain/library/model/BorrowStatus";
import {randomUUID} from "node:crypto";

export function harryPotter() {
  return new Book(
    randomUUID(),
    "Harry Potter",
    ["J.K Rowling"],
    [BookCategory.Fiction, BookCategory.Fantasy, BookCategory.ChildrenStory],
    BorrowStatus.Available,
    "9d7f9732-4c9b-4f97-8da3-b12859c276a",
  );
}

export function lordOfTheRings() {
  return new Book(
    randomUUID(),
    "Lord of the Ring",
    ["Tolkien"],
    [BookCategory.Fiction, BookCategory.Mystery, BookCategory.Adventure],
    BorrowStatus.Borrowed,
    "9d7f9732-4c9b-4f97-8da3-b12859c276a",
  );
}

export function sherlockHolmes() {
  return new Book(
    randomUUID(),
    "sherlock Holmes",
    ["Conan Doyle"],
    [BookCategory.Fiction, BookCategory.Mystery, BookCategory.Crime, BookCategory.Detective],
    BorrowStatus.Borrowed,
    "9d7f9732-4c9b-4f97-8da3-b12859c276a",
  );
}


export function lesMemoires() {
  return new Book(
    randomUUID(),
    "les Memoires d'un chat",
    ["Hiro Arikawa"],
    [BookCategory.Fiction, BookCategory.Novel, BookCategory.Adventure],
    BorrowStatus.Borrowed,
    "9d7f9732-4c9b-4f97-8da3-b12859c276a",
  );
}

