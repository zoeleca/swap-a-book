import { describe, expect, it } from "vitest";
import { BookCategory } from "../../../../src/library/domain/model/BookCategory";
import { InMemoryBooksRepository } from "../../../../src/library/infrastructure/secondary/InMemoryBooksRepository";
import { FakeUUIDGenerator } from "../../../../src/library/infrastructure/secondary/FakeUUIDGenerator";
import {Book} from "../../../../src/library/domain/model/Book";
import {BorrowStatus} from "../../../../src/library/domain/model/BorrowStatus";
import {RemoveBook} from "../../../../src/library/domain/features/RemoveBook";

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
        [BookCategory.Fiction, BookCategory.Fantasy, BookCategory.ChildrenStory],
        BorrowStatus.Available
    );
    await repository.save(book);
    await removeBook.execute(bookId);

    expect(await repository.findById(bookId)).toBeUndefined();
  });
});
