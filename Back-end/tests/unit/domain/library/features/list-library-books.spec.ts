import { describe, expect, it } from "vitest";
import { AddBookUseCase } from "../../../../../src/domain/library/features/add-book.use-case";
import { BookCategoriesModel } from "../../../../../src/domain/library/models/book-categories.model";
import { randomUUID } from "node:crypto";
import { InMemoryBooksRepository } from "../../../../../src/infrastructure/mocks/in-memory-books.repository";
import { FakeUuidGenerator } from "../../../../../src/infrastructure/mocks/fake-uuid-generator";
import { BookLanguagesModel } from "../../../../../src/domain/library/models/book-languages.model";

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
        BookCategoriesModel.Fiction,
        BookCategoriesModel.Fantasy,
        BookCategoriesModel.ChildrenStory,
      ],
      languages: [BookLanguagesModel.English],
    });

    const lordOfTheRingBook = await addBook.execute({
      libraryId,
      title: "Lord of the Rings",
      authors: ["Tolkien"],
      categories: [
        BookCategoriesModel.Fiction,
        BookCategoriesModel.Mystery,
        BookCategoriesModel.Adventure,
      ],
      languages: [BookLanguagesModel.English],
    });

    const books = await repository.listAllBooks(libraryId);

    expect(books).toHaveLength(2);
    expect(books).toContainEqual(harryPotterBook);
    expect(books).toContainEqual(lordOfTheRingBook);
  });
});
