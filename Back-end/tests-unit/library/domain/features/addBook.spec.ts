import { describe, expect, it } from "vitest";
import { BookCategory } from "../../../../src/library/domain/model/BookCategory";
import { book } from "../model/book.fixture";
import { AddBook } from "../../../../src/library/domain/features/AddBook";
import { InMemoryBooksRepository } from "../../../../src/library/infrastructure/secondary/InMemoryBooksRepository";
import { FakeUUIDGenerator } from "../../../../src/library/infrastructure/secondary/FakeUUIDGenerator";

describe("addBook", () => {
  it("should add a book to my Library", async () => {
    const repository = new InMemoryBooksRepository();
    const uuidGenerator = new FakeUUIDGenerator();
    const addBook = new AddBook(repository, uuidGenerator);

    const addedBook = await addBook.execute({
      libraryId: "8d7f9732-4c9b-4f97-8da3-b12859c276af",
      title: "Harry Potter",
      authors: ["J.K Rowling"],
      categories: [
        BookCategory.Fiction,
        BookCategory.Fantasy,
        BookCategory.ChildrenStory,
      ],
    });
    expect(repository.books.get(addedBook.id)).toEqual(book());
  });
});