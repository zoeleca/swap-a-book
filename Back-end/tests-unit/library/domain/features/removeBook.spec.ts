import { describe, expect, it } from "vitest";
import { BookCategory } from "../../../../src/library/domain/model/BookCategory";
import { InMemoryBooksRepository } from "../../../../src/library/infrastructure/secondary/InMemoryBooksRepository";
import { FakeUUIDGenerator } from "../../../../src/library/infrastructure/secondary/FakeUUIDGenerator";
import {Book} from "../../../../src/library/domain/model/Book";
import {BorrowStatus} from "../../../../src/library/domain/model/BorrowStatus";
import {DeleteBook} from "../../../../src/library/domain/features/DeleteBook";

describe("deleteBook", () => {
  it("should delete a book from my Library", async () => {
    const repository = new InMemoryBooksRepository();
    const uuidGenerator = new FakeUUIDGenerator();
    const deleteBook = new DeleteBook(repository);
    const bookId = uuidGenerator.generate();

    const book = new Book(
        bookId,
        "Harry Potter",
        ["J.K. Rowling"],
        [BookCategory.Fiction, BookCategory.Fantasy, BookCategory.ChildrenStory],
        BorrowStatus.Available
    );
    await repository.save(book);
    await deleteBook.execute(bookId);

    expect(await repository.findById(bookId)).toBeUndefined();
  });
});
