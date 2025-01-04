import { describe, expect, it } from "vitest";
import { randomUUID } from "node:crypto";
import { BookModel } from "../../../../../src/domain/library/models/book.model";
import { BookCategoryModel } from "../../../../../src/domain/library/models/book-category.model";
import { BorrowStatusModel } from "../../../../../src/domain/library/models/borrow-status.model";
import { InMemoryBooksRepository } from "../../../../../src/infrastructure/mocks/in-memory-books.repository";

describe("InMemoryBooksRepository", () => {
  it("should store multiple books without overwriting", async () => {
    const repository = new InMemoryBooksRepository();
    const libraryId = randomUUID();

    const book1 = new BookModel(
      randomUUID(),
      "Harry Potter",
      ["J.K Rowling"],
      [BookCategoryModel.Fiction, BookCategoryModel.Fantasy],
      BorrowStatusModel.Available,
      libraryId
    );

    const book2 = new BookModel(
      randomUUID(),
      "Lord of the Rings",
      ["J.R.R. Tolkien"],
      [BookCategoryModel.Fiction, BookCategoryModel.Adventure],
      BorrowStatusModel.Borrowed,
      libraryId
    );

    await repository.save(book1);
    await repository.save(book2);

    const books = await repository.listAllBooks(libraryId);

    expect(books).toHaveLength(2);
    expect(books).toEqual(expect.arrayContaining([book1, book2]));
  });
});
