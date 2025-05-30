import supertest from "supertest";
import { beforeAll, describe, expect, it } from "vitest";
import { Application } from "../../src/presentation/application";
import { FakeUuidGenerator } from "../../src/infrastructure/mocks/fake-uuid-generator";
import { InMemoryBooksRepository } from "../../src/infrastructure/mocks/in-memory-books.repository";
import { InMemoryUsersRepository } from "../../src/infrastructure/mocks/in-memory-users.repository";

process.env.NODE_ENV = "test";

describe("library", () => {
  const uuidGenerator = new FakeUuidGenerator();
  const booksRepository = new InMemoryBooksRepository();
  const userRepository = new InMemoryUsersRepository();
  const app = new Application(booksRepository, userRepository, uuidGenerator);
  const supertestApp = supertest(app.expressApp);
  let library: { libraryId: string };

  beforeAll(async () => {
    library = await booksRepository.createFakeUserAndLibrary("test-user-id");

    await supertestApp
      .post("/books")
      .set("Accept", "application/json")
      .set("Content-Type", "application/json")
      .send({
        libraryId: library.libraryId,
        title: "Lord of the Rings",
        authors: ["Tolkien"],
        categories: ["Fiction", "Mystery", "Adventure"],
        languages: ["English"],
        status: "Visible",
        borrowStatus: "Available",
      });

    await supertestApp
      .post("/books")
      .set("Accept", "application/json")
      .set("Content-Type", "application/json")
      .send({
        libraryId: library.libraryId,
        title: "Les Mémoires d'un chat",
        authors: ["Hiro Arikawa"],
        categories: ["Fiction", "Novel", "Adventure"],
        languages: ["French"],
        status: "Visible",
        borrowStatus: "Available",
      });
  });

  it("should add a book", async () => {
    const response = await supertestApp
      .post("/books")
      .set("Accept", "application/json")
      .set("Content-Type", "application/json")
      .send({
        libraryId: library.libraryId,
        title: "Harry Potter 2",
        authors: ["J.K. Rowling"],
        categories: ["Fiction", "Novel", "ChildrenStory", "Fantasy"],
        languages: ["English"],
        status: "Visible",
        borrowStatus: "Available",
      });

    expect(response.status).toBe(201);
    expect(response.body.book).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        title: "Harry Potter 2",
        authors: ["J.K. Rowling"],
        categories: ["Fiction", "Novel", "ChildrenStory", "Fantasy"],
        borrowStatus: "Available",
        status: "Visible",
      })
    );
  });

  it("should remove a book", async () => {
    const sherlockResponse = await supertestApp
      .post("/books")
      .set("Accept", "application/json")
      .set("Content-Type", "application/json")
      .send({
        libraryId: library.libraryId,
        title: "Sherlock Holmes",
        authors: ["Conan Doyle"],
        categories: ["Fiction", "Mystery", "Crime", "Detective"],
        languages: ["English"],
        status: "Visible",
        borrowStatus: "Available",
      });

    expect(sherlockResponse.status).toBe(201);

    const removeBook = await supertestApp
      .delete(`/books/${sherlockResponse.body.book.id}`)
      .set("Accept", "application/json");

    expect(removeBook.status).toBe(204);

    const getResponse = await supertestApp
      .get(`/books/${sherlockResponse.body.book.id}`)
      .set("Accept", "application/json");

    expect(getResponse.status).toBe(404);
  });
});
