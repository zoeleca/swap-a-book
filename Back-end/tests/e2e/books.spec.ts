import supertest from "supertest";
import {beforeEach, describe, expect, it} from "vitest";
import {Application} from "../../src/presentation/application";
import {FakeUuidGenerator} from "../../src/infrastructure/mocks/fake-uuid-generator";
import {InMemoryBooksRepository} from "../../src/infrastructure/mocks/in-memory-books.repository";

describe("library", () => {
  const uuidGenerator = new FakeUuidGenerator();
  const booksRepository = new InMemoryBooksRepository();
  const app = new Application(booksRepository, uuidGenerator);
  const supertestApp = supertest(app.expressApp);

  beforeEach(async () => {
    await supertestApp
      .post("/books")
      .set("Accept", "application/json")
      .set("Content-Type", "application/json")
      .send({
        libraryId: "9d7f9732-4c9b-4f97-8da3-b12859c276af",
        title: "Lord of the Rings",
        authors: ["Tolkien"],
        categories: ["Fiction", "Mystery", "Adventure"],
      });

    await supertestApp
      .post("/books")
      .set("Accept", "application/json")
      .set("Content-Type", "application/json")
      .send({
        libraryId: "9d7f9732-4c9b-4f97-8da3-b12859c276af",
        title: "Les Mémoires d'un chat",
        authors: ["Hiro Arikawa"],
        categories: ["Fiction", "Novel", "Adventure"],
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
        authors: ["J.K. Rowling"],
        categories: ["Fiction", "Novel", "ChildrenStory", "Fantasy"],
      });
    expect(response.status).toBe(201);
    expect(response.body.book).toEqual({
      id: expect.any(String),
      title: "Harry Potter 2",
      authors: ["J.K. Rowling"],
      categories: ["Fiction", "Novel", "ChildrenStory", "Fantasy"],
      borrowStatus: "Available",
      status: "Visible",
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

  it("should list all books", async () => {
    const libraryResponse = await supertestApp
      .get("/library/e240939f-b4f1-42de-801c-5e7adf4520b4/books")
      .set("Accept", "application/json")
      .set("Content-Type", "application/json");

    console.log(JSON.stringify(libraryResponse));
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
          },
        },
        {
          book: {
            id: expect.any(String),
            title: "Les Mémoires d'un chat",
            authors: ["Hiro Arikawa"],
            categories: expect.arrayContaining([
              "Fiction",
              "Novel",
              "Adventure",
            ]),
            borrowStatus: "Available",
          },
        },
        {
          book: {
            id: expect.any(String),
            title: "Harry Potter 2",
            authors: ["J.K. Rowling"],
            categories: ["Fiction", "Novel", "ChildrenStory", "Fantasy"],
            borrowStatus: "Available",
          },
        },
      ])
    );
  });
});
