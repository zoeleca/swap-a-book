import { describe, expect, it } from "vitest";
import { BookCategory } from "../../../../src/library/domain/model/BookCategory";
import { InMemoryBooksRepository } from "../../../../src/library/infrastructure/secondary/InMemoryBooksRepository";
import { AddBook } from "../../../../src/library/domain/features/AddBook";
import { FakeUUIDGenerator } from "../../../../src/library/infrastructure/secondary/FakeUUIDGenerator";

describe("listAllBooks", () => {
  it("should display all books of my Library", async () => {
    const repository = new InMemoryBooksRepository();
    const uuidGenerator = new FakeUUIDGenerator();
    const addBook = new AddBook(repository, uuidGenerator);

    const harryPotterBook = await addBook.execute({
      libraryId: "8d7f9732-4c9b-4f97-8da3-b12859c276af",
      title: "Harry Potter",
      authors: ["J.K Rowling"],
      categories: [
        BookCategory.Fiction,
        BookCategory.Fantasy,
        BookCategory.ChildrenStory,
      ],
    });

    const lordOfTheRingBook = await addBook.execute({
      libraryId: "8d7f9732-4c9b-4f97-8da3-b12859c276af",
      title: "Lord of the Rings",
      authors: ["Tolkien"],
      categories: [
        BookCategory.Fiction,
        BookCategory.Mystery,
        BookCategory.Adventure
      ],
    });

    const books = await repository.listAllBooks();

    expect(books).toHaveLength(2);
    expect(books).toContainEqual(harryPotterBook);
    expect(books).toContainEqual(lordOfTheRingBook);
  });
});
