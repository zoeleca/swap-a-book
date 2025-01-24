import { describe, expect, it } from "vitest";
import { AddBookUseCase } from "../../../../../src/domain/library/features/add-book.use-case";
import { BookCategoriesModel } from "../../../../../src/domain/library/models/book-categories.model";
import { InMemoryBooksRepository } from "../../../../../src/infrastructure/mocks/in-memory-books.repository";
import { FakeUuidGenerator } from "../../../../../src/infrastructure/mocks/fake-uuid-generator";
import { BookLanguagesModel } from "../../../../../src/domain/library/models/book-languages.model";

describe("listAllVisibleBooks", () => {
  it("should display all visible books", async () => {
    const repository = new InMemoryBooksRepository();
    const uuidGenerator = new FakeUuidGenerator();
    const addBook = new AddBookUseCase(repository, uuidGenerator);

    const harryPotterBook = await addBook.execute({
      libraryId: uuidGenerator.generate(),
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
      libraryId: uuidGenerator.generate(),
      title: "Lord of the Rings",
      authors: ["Tolkien"],
      categories: [
        BookCategoriesModel.Fiction,
        BookCategoriesModel.Mystery,
        BookCategoriesModel.Adventure,
      ],
      languages: [BookLanguagesModel.English],
    });

    const theGrinchBook = await addBook.execute({
      libraryId: uuidGenerator.generate(),
      title: "The Grinch",
      authors: ["Grinch"],
      categories: [BookCategoriesModel.Fantasy, BookCategoriesModel.Adventure],
      languages: [BookLanguagesModel.French],
    });

    const books = await repository.findAllVisibleBooks();

    expect(books).toHaveLength(3);
    expect(books).toContainEqual(harryPotterBook);
    expect(books).toContainEqual(lordOfTheRingBook);
    expect(books).toContainEqual(theGrinchBook);
  });
});
