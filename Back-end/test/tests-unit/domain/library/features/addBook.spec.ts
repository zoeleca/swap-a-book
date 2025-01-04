import { describe, expect, it } from "vitest";
import { InMemoryBooksRepository } from "../../../../../src/infrastructure/secondary/InMemoryBooksRepository";
import { FakeUUIDGenerator } from "../../../../../src/infrastructure/secondary/FakeUUIDGenerator";
import { AddBook } from "../../../../../src/domain/library/features/AddBook";
import { BookCategory } from "../../../../../src/domain/library/model/BookCategory";

describe("addBook", () => {
  it("should add a book to my Library", async () => {
    const repository = new InMemoryBooksRepository();
    const uuidGenerator = new FakeUUIDGenerator();
    const addBook = new AddBook(repository, uuidGenerator);

    const addedBook = await addBook.execute({
      libraryId: "9d7f9732-4c9b-4f97-8da3-b12859c276a",
      title: "Harry Potter",
      authors: ["J.K Rowling"],
      categories: [
        BookCategory.Fiction,
        BookCategory.Fantasy,
        BookCategory.ChildrenStory,
      ],
    });
    expect(repository.books.get(addedBook.id)).toEqual(addedBook);
  });
});
