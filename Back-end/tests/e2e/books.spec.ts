import supertest from "supertest";
import { beforeAll, describe, expect, it } from "vitest";
import { Application } from "../../src/presentation/application";
import { FakeUuidGenerator } from "../../src/infrastructure/mocks/fake-uuid-generator";
import { InMemoryBooksRepository } from "../../src/infrastructure/mocks/in-memory-books.repository";
import { randomUUID } from "node:crypto";
import { InMemoryUserRepository } from "../../src/infrastructure/mocks/InMemoryUserRepository";

describe("library", () => {
  const uuidGenerator = new FakeUuidGenerator();
  const booksRepository = new InMemoryBooksRepository();
  const userRepository = new InMemoryUserRepository();
  const app = new Application(booksRepository, uuidGenerator, userRepository);
  const supertestApp = supertest(app.expressApp);

  beforeAll(async () => {
    const lotrResponse = await supertestApp
      .post("/books")
      .set("Accept", "application/json")
      .set("Content-Type", "application/json")
      .send({
        libraryId: "9d7f9732-4c9b-4f97-8da3-b12859c276af",
        title: "Lord of the Rings",
        authors: ["Tolkien"],
        languages: ["English"],
        categories: ["Fiction", "Mystery", "Adventure"],
      });

    const lesMemoiresResponse = await supertestApp
      .post("/books")
      .set("Accept", "application/json")
      .set("Content-Type", "application/json")
      .send({
        libraryId: "9d7f9732-4c9b-4f97-8da3-b12859c276af",
        title: "les Memoires d'un chat",
        authors: ["Hiro Arikawa"],
        languages: ["English"],
        categories: ["Fiction", "Novel", "Adventure"],
      });

    const LaMaisonDesSortileges = await supertestApp
      .post("/books")
      .set("Accept", "application/json")
      .set("Content-Type", "application/json")
      .send({
        libraryId: randomUUID(),
        title: "la maison des sortilèges",
        authors: ["Emilia Hart"],
        languages: ["French"],
        categories: ["Fiction", "Novel", "Mystery"],
      });
  });

  it("should add a book", async () => {
    const response = await supertestApp
      .post("/books")
      .set("Accept", "application/json")
      .set("Content-Type", "application/json")
      .send({
        libraryId: "9d7f9732-4c9b-4f97-8da3-b12859c276af",
        title: "Harry Potter 2",
        authors: ["J.K Rowling"],
        languages: ["French"],
        categories: ["Fiction", "Novel", "ChildrenStory", "Fantasy"],
      });
    expect(response.status).toBe(201);
    expect(response.body.book).toEqual({
      id: expect.any(String),
      title: "Harry Potter 2",
      authors: ["J.K Rowling"],
      categories: ["Fiction", "Novel", "ChildrenStory", "Fantasy"],
      languages: ["French"],
      status: "Visible",
      borrowStatus: "Available",
    });
  });

  it("should remove a book", async () => {
    const sherlockResponse = await supertestApp
      .post("/books")
      .set("Accept", "application/json")
      .set("Content-Type", "application/json")
      .send({
        libraryId: "9d7f9732-4c9b-4f97-8da3-b12859c276af",
        title: "Sherlock Holmes",
        authors: ["Conan Doyle"],
        languages: ["English"],
        categories: ["Fiction", "Mystery", "Crime", "Detective"],
        borrowStatus: "Available",
      });

    const removeBook = await supertestApp
      .delete(`/books/${sherlockResponse.body.book.id}`)
      .set("Accept", "application/json")
      .set("Content-Type", "application/json");

    expect(removeBook.status).toBe(204);

    const getResponse = await supertestApp
      .get(`/books/${sherlockResponse.body.book.id}`)
      .set("Accept", "application/json")
      .set("Content-Type", "application/json");

    expect(getResponse.status).toBe(404);
  });

  it("should list a Library's books", async () => {
    const libraryResponse = await supertestApp
      .get("/books/")
      .set("Accept", "application/json")
      .set("Content-Type", "application/json");

    expect(libraryResponse.status).toBe(200);
    expect(libraryResponse.body).toEqual(
      expect.arrayContaining([
        {
          book: {
            id: expect.any(String),
            title: "Lord of the Rings",
            authors: ["Tolkien"],
            categories: expect.arrayContaining([
              "Fiction",
              "Mystery",
              "Adventure",
            ]),
            borrowStatus: "Available",
            languages: ["English"],
            status: "Visible",
          },
        },
        {
          book: {
            id: expect.any(String),
            title: "Harry Potter 2",
            authors: ["J.K Rowling"],
            categories: ["Fiction", "Novel", "ChildrenStory", "Fantasy"],
            borrowStatus: "Available",
            languages: ["French"],
            status: "Visible",
          },
        },
        {
          book: {
            id: expect.any(String),
            title: "les Memoires d'un chat",
            authors: ["Hiro Arikawa"],
            categories: expect.arrayContaining([
              "Fiction",
              "Novel",
              "Adventure",
            ]),
            borrowStatus: "Available",
            languages: ["English"],
            status: "Visible",
          },
        },
      ])
    );
  });

  it("should all visible books", async () => {
    const libraryResponse = await supertestApp
      .get("/books")
      .set("Accept", "application/json")
      .set("Content-Type", "application/json");

    expect(libraryResponse.status).toBe(200);
    expect(libraryResponse.body).toEqual(
      expect.arrayContaining([
        {
          book: {
            id: expect.any(String),
            title: "Lord of the Rings",
            authors: ["Tolkien"],
            categories: expect.arrayContaining([
              "Fiction",
              "Mystery",
              "Adventure",
            ]),
            borrowStatus: "Available",
            languages: ["English"],
            status: "Visible",
          },
        },

        {
          book: {
            id: expect.any(String),
            title: "les Memoires d'un chat",
            authors: ["Hiro Arikawa"],
            categories: expect.arrayContaining([
              "Fiction",
              "Novel",
              "Adventure",
            ]),
            borrowStatus: "Available",
            languages: ["English"],
            status: "Visible",
          },
        },
        {
          book: {
            id: expect.any(String),
            title: "Harry Potter 2",
            authors: ["J.K Rowling"],
            categories: ["Fiction", "Novel", "ChildrenStory", "Fantasy"],
            borrowStatus: "Available",
            languages: ["French"],
            status: "Visible",
          },
        },
        {
          book: {
            id: expect.any(String),
            title: "la maison des sortilèges",
            authors: ["Emilia Hart"],
            categories: expect.arrayContaining(["Fiction", "Novel", "Mystery"]),
            borrowStatus: "Available",
            languages: ["French"],
            status: "Visible",
          },
        },
      ])
    );
  });
});
