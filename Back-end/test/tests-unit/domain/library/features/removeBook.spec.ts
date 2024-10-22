import { describe, expect, it } from "vitest";
import { BorrowStatus } from "../../../../../src/domain/library/model/BorrowStatus";
import { BookCategory } from "../../../../../src/domain/library/model/BookCategory";
import {RemoveBook} from "../../../../../src/domain/library/features/RemoveBook";
import {FakeUUIDGenerator} from "../../../../../src/infrastructure/secondary/FakeUUIDGenerator";
import {InMemoryBooksRepository} from "../../../../../src/infrastructure/secondary/InMemoryBooksRepository";
import {Book} from "../../../../../src/domain/library/model/Book";

describe("removeBook", () => {
  it("should remove a book from my Library", async () => {
    const repository = new InMemoryBooksRepository();
    const uuidGenerator = new FakeUUIDGenerator();
    const removeBook = new RemoveBook(repository);
    const bookId = uuidGenerator.generate();

    const book = new Book(
        bookId,
        "Harry Potter",
        ["J.K. Rowling"],
        [BookCategory.FICTION, BookCategory.FANTASY, BookCategory.CHILDREN_STORY],
      BorrowStatus.AVAILABLE
    );
    await repository.save(book);
    await removeBook.execute(bookId);

    expect(await repository.findById(bookId)).toBeUndefined();
  });
});
