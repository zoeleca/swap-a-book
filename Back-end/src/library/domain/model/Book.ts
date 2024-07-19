import { BookCategory } from "./BookCategory";
import { BorrowStatus } from "./BorrowStatus";

export class Book {
  //todo : builder
  constructor(
    public readonly id: string,
    public readonly title: string,
    public readonly authors: string[],
    public readonly categories: BookCategory[],
    public readonly borrowStatus: BorrowStatus
  ) {}
}

//test
