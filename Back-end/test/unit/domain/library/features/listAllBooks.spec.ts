import { describe, expect, it } from "vitest";
import { AddBook } from "../../../../../src/domain/library/features/AddBook";
import { BookCategory } from "../../../../../src/domain/library/models/BookCategory";
import { randomUUID } from "node:crypto";
import { InMemoryBooksRepository } from "../../../../../src/infrastructure/mocks/InMemoryBooksRepository";
import { FakeUUIDGenerator } from "../../../../../src/infrastructure/mocks/FakeUUIDGenerator";

describe("listAllBooks", () => {
  it("should display all books of my Library", async () => {
    const repository = new InMemoryBooksRepository();
    const uuidGenerator = new FakeUUIDGenerator();
    const addBook = new AddBook(repository, uuidGenerator);
    const libraryId = randomUUID();

    const harryPotterBook = await addBook.execute({
      libraryId,
      title: "Harry Potter",
      authors: ["J.K Rowling"],
      categories: [
        BookCategory.Fiction,
        BookCategory.Fantasy,
        BookCategory.ChildrenStory,
      ],
    });

    const lordOfTheRingBook = await addBook.execute({
      libraryId,
      title: "Lord of the Rings",
      authors: ["Tolkien"],
      categories: [
        BookCategory.Fiction,
        BookCategory.Mystery,
        BookCategory.Adventure,
      ],
    });

    const books = await repository.listAllBooks(libraryId);

    expect(books).toHaveLength(2);
    expect(books).toContainEqual(harryPotterBook);
    expect(books).toContainEqual(lordOfTheRingBook);
  });
});
