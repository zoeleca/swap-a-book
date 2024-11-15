import {describe, expect, it} from "vitest";
import {InMemoryBooksRepository} from "../../../../../src/infrastructure/secondary/InMemoryBooksRepository";
import {FakeUUIDGenerator} from "../../../../../src/infrastructure/secondary/FakeUUIDGenerator";
import {AddBook} from "../../../../../src/domain/library/features/AddBook";
import {BookCategory} from "../../../../../src/domain/library/model/BookCategory";
import {randomUUID} from "node:crypto";

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
        BookCategory.FICTION,
        BookCategory.FANTASY,
        BookCategory.CHILDREN_STORY,
      ],
    });

    const lordOfTheRingBook = await addBook.execute({
      libraryId,
      title: "Lord of the Rings",
      authors: ["Tolkien"],
      categories: [
        BookCategory.FICTION,
        BookCategory.MYSTERY,
        BookCategory.ADVENTURE
      ],
    });

    const books = await repository.listAllBooks(libraryId);

    expect(books).toHaveLength(2);
    expect(books).toContainEqual(harryPotterBook);
    expect(books).toContainEqual(lordOfTheRingBook);
  });
});
