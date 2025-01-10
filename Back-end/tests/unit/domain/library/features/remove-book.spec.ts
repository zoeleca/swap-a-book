import { describe, expect, it } from "vitest";
import { BorrowStatusModel } from "../../../../../src/domain/library/models/borrow-status.model";
import { BookCategoriesModel } from "../../../../../src/domain/library/models/book-categories.model";
import { RemoveBookUseCase } from "../../../../../src/domain/library/features/remove-book.use-case";
import { BookModel } from "../../../../../src/domain/library/models/book.model";
import { randomUUID } from "node:crypto";
import { BookLanguagesModel } from "../../../../../src/domain/library/models/book-languages.model";
import { BookStatusModel } from "../../../../../src/domain/library/models/book-status.model";
import { InMemoryBooksRepository } from "../../../../../src/infrastructure/mocks/in-memory-books.repository";
import { FakeUuidGenerator } from "../../../../../src/infrastructure/mocks/fake-uuid-generator";

describe("removeBook", () => {
  it("should remove a book from my LibraryModel", async () => {
    const repository = new InMemoryBooksRepository();
    const uuidGenerator = new FakeUuidGenerator();
    const removeBook = new RemoveBookUseCase(repository);
    const bookId = uuidGenerator.generate();
    const libraryId = randomUUID();

    const book = new BookModel(
      bookId,
      "Harry Potter",
      ["J.K. Rowling"],
      [
        BookCategoriesModel.Fiction,
        BookCategoriesModel.Fantasy,
        BookCategoriesModel.ChildrenStory,
      ],
      [BookLanguagesModel.English],
      BorrowStatusModel.Available,
      BookStatusModel.Visible,
      libraryId
    );
    await repository.save(book);
    await removeBook.execute(bookId);

    expect(await repository.getById(bookId)).toBeUndefined();
  });
});
