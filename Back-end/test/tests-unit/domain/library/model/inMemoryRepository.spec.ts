import { describe, expect, it } from "vitest";
import { randomUUID } from "node:crypto";
import { InMemoryBooksRepository } from "../../../../../src/infrastructure/secondary/InMemoryBooksRepository";
import { Book } from "../../../../../src/domain/library/model/Book";
import { BookCategory } from "../../../../../src/domain/library/model/BookCategory";
import { BorrowStatus } from "../../../../../src/domain/library/model/BorrowStatus";

describe("InMemoryBooksRepository", () => {
  it("should store multiple books without overwriting", async () => {
    const repository = new InMemoryBooksRepository();
    const libraryId = randomUUID();

    const book1 = new Book(
      randomUUID(),
      "Harry Potter",
      ["J.K Rowling"],
      [BookCategory.Fiction, BookCategory.Fantasy],
      BorrowStatus.Available,
      libraryId
    );

    const book2 = new Book(
      randomUUID(),
      "Lord of the Rings",
      ["J.R.R. Tolkien"],
      [BookCategory.Fiction, BookCategory.Adventure],
      BorrowStatus.Borrowed,
      libraryId
    );

    await repository.save(book1);
    await repository.save(book2);

    const books = await repository.listAllBooks(libraryId);

    expect(books).toHaveLength(2);
    expect(books).toEqual(expect.arrayContaining([book1, book2]));
  });
});
