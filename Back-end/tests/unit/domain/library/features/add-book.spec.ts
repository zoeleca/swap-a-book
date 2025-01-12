import { describe, expect, it } from "vitest";
import { AddBookUseCase } from "../../../../../src/domain/library/features/add-book.use-case";
import { BookCategoriesModel } from "../../../../../src/domain/library/models/book-categories.model";
import { InMemoryBooksRepository } from "../../../../../src/infrastructure/mocks/in-memory-books.repository";
import { FakeUuidGenerator } from "../../../../../src/infrastructure/mocks/fake-uuid-generator";
import { BookLanguagesModel } from "../../../../../src/domain/library/models/book-languages.model";

describe("addBook", () => {
  it("should add a book to my LibraryModel", async () => {
    const repository = new InMemoryBooksRepository();
    const uuidGenerator = new FakeUuidGenerator();
    const addBook = new AddBookUseCase(repository, uuidGenerator);

    const addedBook = await addBook.execute({
      libraryId: "9d7f9732-4c9b-4f97-8da3-b12859c276a",
      title: "Harry Potter",
      authors: ["J.K Rowling"],
      categories: [
        BookCategoriesModel.Fiction,
        BookCategoriesModel.Fantasy,
        BookCategoriesModel.ChildrenStory,
      ],
      languages: [BookLanguagesModel.French],
    });
    expect(repository.books.get(addedBook.id)).toEqual(addedBook);
  });
});
