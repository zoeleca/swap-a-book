import supertest from 'supertest';
import { describe, expect, it } from "vitest";
import { Application } from "../src/library/infrastructure/primary/Application";
import { FakeUUIDGenerator } from "../src/library/infrastructure/secondary/FakeUUIDGenerator";
import { InMemoryBooksRepository } from "../src/library/infrastructure/secondary/InMemoryBooksRepository";

describe("library", () => {

  it("should add a book", async () => {
      const uuidGenerator = new FakeUUIDGenerator();
      const booksRepository = new InMemoryBooksRepository();
      const app = new Application(booksRepository, uuidGenerator);
      const supertestApp = supertest(app.expressApp);


    const response = await supertestApp
      .post("/books")
      .set("Accept", "application/json")
      .set("Content-Type", "application/json")
      .send({
        libraryId: "8d7f9732-4c9b-4f97-8da3-b12859c276af",
        title: "Harry Potter",
        authors: ["J.K Rowling"],
        categories: ["Fiction", "Fantasy", "ChildrenStory"],
      });

        expect(response.status).toBe(200);
        expect(response.body.book).toEqual({
            id: "978a28c3-bafe-4569-acae-4932eeab580e",
            title: "Harry Potter",
            authors: ["J.K Rowling"],
            categories: ["Fiction", "Fantasy", "ChildrenStory"],
            borrowStatus: "Available",
        });
    });

    it("should remove a book", async () => {
        const uuidGenerator = new FakeUUIDGenerator();
        const booksRepository = new InMemoryBooksRepository();
        const app = new Application(booksRepository, uuidGenerator);
        const supertestApp = supertest(app.expressApp);

        const addBook = await supertestApp
            .post("/books")
            .set("Accept", "application/json")
            .set("Content-Type", "application/json")
            .send({
                libraryId: "8d7f9732-4c9b-4f97-8da3-b12859c276af",
                title: "Harry Potter",
                authors: ["J.K Rowling"],
                categories: ["Fiction", "Fantasy", "ChildrenStory"],
                borrowStatus: "Available",
            });

        const bookId = addBook.body.book.id;

        const removeBook = await supertestApp
            .delete(`/books/${bookId}`)
            .set("Accept", "application/json")
            .set("Content-Type", "application/json");

        expect(removeBook.status).toBe(204);

        // Verify that the book was successfully removed
        const getResponse = await supertestApp
            .get(`/books/${bookId}`)
            .set("Accept", "application/json")
            .set("Content-Type", "application/json");

        expect(getResponse.status).toBe(404);
    });
});
