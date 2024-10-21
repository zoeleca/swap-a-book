import { BookCategory } from "./BookCategory";
import { BorrowStatus } from "./BorrowStatus";
import {LibraryId} from "./LibraryId";
import {Library} from "./Library";

export class Book {
  //todo : builder

  constructor(
    public readonly id: string,
    public readonly title: string,
    public readonly authors: string[],
    public readonly categories: BookCategory[],
    public readonly borrowStatus: BorrowStatus,
    public readonly libraryId: string
  ) {
    if (!title || title.trim().length === 0) {
      throw new Error("Title cannot be empty");
    }
  }

}

//test
