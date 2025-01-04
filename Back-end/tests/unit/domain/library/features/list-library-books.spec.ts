import { describe, expect, it } from "vitest";
import { AddBookUseCase } from "../../../../../src/domain/library/features/add-book.use-case";
import { BookCategoryModel } from "../../../../../src/domain/library/models/book-category.model";
import { randomUUID } from "node:crypto";
import { InMemoryBooksRepository } from "../../../../../src/infrastructure/mocks/in-memory-books.repository";
import { FakeUuidGenerator } from "../../../../../src/infrastructure/mocks/fake-uuid-generator";

describe("listAllBooks", () => {
  it("should display all books of my LibraryModel", async () => {
    const repository = new InMemoryBooksRepository();
    const uuidGenerator = new FakeUuidGenerator();
    const addBook = new AddBookUseCase(repository, uuidGenerator);
    const libraryId = randomUUID();

    const harryPotterBook = await addBook.execute({
      libraryId,
      title: "Harry Potter",
      authors: ["J.K Rowling"],
      categories: [
        BookCategoryModel.Fiction,
        BookCategoryModel.Fantasy,
        BookCategoryModel.ChildrenStory,
      ],
    });

    const lordOfTheRingBook = await addBook.execute({
      libraryId,
      title: "Lord of the Rings",
      authors: ["Tolkien"],
      categories: [
        BookCategoryModel.Fiction,
        BookCategoryModel.Mystery,
        BookCategoryModel.Adventure,
      ],
    });

    const books = await repository.listAllBooks(libraryId);

    expect(books).toHaveLength(2);
    expect(books).toContainEqual(harryPotterBook);
    expect(books).toContainEqual(lordOfTheRingBook);
  });
});
