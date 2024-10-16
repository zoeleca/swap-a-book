import { describe, expect, it } from "vitest";
import {InMemoryBooksRepository} from "../../../../src/infrastructure/secondary/InMemoryBooksRepository";
import {FakeUUIDGenerator} from "../../../../src/infrastructure/secondary/FakeUUIDGenerator";
import {RemoveBook} from "../../../../src/domain/library/features/RemoveBook";
import {Book} from "../../../../src/domain/library/model/Book";
import {BookCategory} from "../../../../src/domain/library/model/BookCategory";
import {BorrowStatus} from "../../../../src/domain/library/model/BorrowStatus";

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
