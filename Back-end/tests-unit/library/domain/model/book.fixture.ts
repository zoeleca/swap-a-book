import { Book } from "../../../../src/library/domain/model/Book";
import { BookCategory } from "../../../../src/library/domain/model/BookCategory";
import { BorrowStatus } from "../../../../src/library/domain/model/BorrowStatus";

export function book() {
  return new Book(
    "978a28c3-bafe-4569-acae-4932eeab580e",
    "Harry Potter",
    ["J.K Rowling"],
    [BookCategory.Fiction, BookCategory.Fantasy, BookCategory.ChildrenStory],
    BorrowStatus.Available
  );
}
