import { describe, expect, it } from "vitest";
import { BorrowStatusModel } from "../../../../../src/domain/library/models/borrow-status.model";
import { BookCategoryModel } from "../../../../../src/domain/library/models/book-category.model";
import { RemoveBookUseCase } from "../../../../../src/domain/library/features/remove-book.use-case";
import { FakeUUIDGenerator } from "../../../../../src/infrastructure/secondary/FakeUuidGenerator";
import { InMemoryBooksRepository } from "../../../../../src/infrastructure/secondary/InMemoryBooksRepository";
import { BookModel } from "../../../../../src/domain/library/models/book.model";
import { randomUUID } from "node:crypto";

describe("removeBook", () => {
  it("should remove a book from my LibraryModel", async () => {
    const repository = new InMemoryBooksRepository();
    const uuidGenerator = new FakeUUIDGenerator();
    const removeBook = new RemoveBookUseCase(repository);
    const bookId = uuidGenerator.generate();
    const libraryId = randomUUID();

    const book = new BookModel(
      bookId,
      "Harry Potter",
      ["J.K. Rowling"],
      [
        BookCategoryModel.Fiction,
        BookCategoryModel.Fantasy,
        BookCategoryModel.ChildrenStory,
      ],
      BorrowStatusModel.Available,
      libraryId
    );
    await repository.save(book);
    await removeBook.execute(bookId);

    expect(await repository.findById(bookId)).toBeUndefined();
  });
});
