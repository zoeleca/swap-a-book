import {describe, expect, it} from "vitest";
import {randomUUID} from "node:crypto";
import {InMemoryBooksRepository} from "../../../../../src/infrastructure/secondary/InMemoryBooksRepository";
import {Book} from "../../../../../src/domain/library/model/Book";
import {BookCategory} from "../../../../../src/domain/library/model/BookCategory";
import {BorrowStatus} from "../../../../../src/domain/library/model/BorrowStatus";

describe("InMemoryBooksRepository", () => {
  it("should store multiple books without overwriting", async () => {
    const repository = new InMemoryBooksRepository();
    const libraryId = randomUUID();

    const book1 = new Book(
      randomUUID(),
      "Harry Potter",
      ["J.K Rowling"],
      [BookCategory.FICTION, BookCategory.FANTASY],
      BorrowStatus.AVAILABLE,
      libraryId
    );

    const book2 = new Book(
      randomUUID(),
      "Lord of the Rings",
      ["J.R.R. Tolkien"],
      [BookCategory.FICTION, BookCategory.ADVENTURE],
      BorrowStatus.BORROWED,
      libraryId
    );

    await repository.save(book1);
    await repository.save(book2);

    const books = await repository.listAllBooks(libraryId);

    expect(books).toHaveLength(2); // Should contain both books
    console.log(books)
    expect(books).toContainEqual(book1);
    expect(books).toContainEqual(book2);
  });
});
