import supertest from 'supertest';
import {beforeEach, describe, expect, it} from "vitest";
import {FakeUUIDGenerator} from "../src/infrastructure/secondary/FakeUUIDGenerator";
import {InMemoryBooksRepository} from "../src/infrastructure/secondary/InMemoryBooksRepository";
import {Application} from "../src/infrastructure/primary/Application";

describe("library", () => {
        const uuidGenerator = new FakeUUIDGenerator();
        const booksRepository = new InMemoryBooksRepository();
        const app = new Application(booksRepository, uuidGenerator);
        const supertestApp = supertest(app.expressApp);

        beforeEach(async () => {

            const lotrResponse = await supertestApp
                .post("/books")
                .set("Accept", "application/json")
                .set("Content-Type", "application/json")
                .send({
                    libraryId: "9d7f9732-4c9b-4f97-8da3-b12859c276af",
                    title: "Lord of the Rings",
                    authors: ["Tolkien"],
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
        authors: ["J.K Rowling"],
        categories: ["Fiction", "Novel", "ChildrenStory", "Fantasy"],
      });
        expect(response.status).toBe(200);
        expect(response.body.book).toEqual({
            id: expect.any(String),
            title: "Harry Potter 2",
            authors: ["J.K Rowling"],
            categories: ["Fiction", "Novel", "ChildrenStory", "Fantasy"],
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
                categories: ["Fiction", "Mystery", "Crime", "Detective"],
                borrowStatus: "Available"
            });
        expect(sherlockResponse.status).toBe(200);
        expect(sherlockResponse.body.book).toEqual({
            id: expect.any(String),
            title: "Sherlock Holmes",
            authors: [ "Conan Doyle",],
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
        const response = await supertestApp
            .get("/library")
            .set("Accept", "application/json")
            .set("Content-Type", "application/json");

        const libraryResponse = await supertestApp
            .get("/library")
            .set("Accept", "application/json")
            .set("Content-Type", "application/json");

        expect(libraryResponse.status).toBe(200);
        expect(libraryResponse.body).toEqual(expect.arrayContaining([
            {
                book: {
                    id: expect.any(String),
                    title: "Lord of the Rings",
                    authors: ["Tolkien"],
                    categories: expect.arrayContaining(["Fiction", "Mystery", "Adventure"]),
                    borrowStatus: "Available",
                }
            },
            {
                book: {
                    id: expect.any(String),
                    title: "les Memoires d'un chat",
                    authors: ["Hiro Arikawa"],
                    categories: expect.arrayContaining(["Fiction", "Novel", "Adventure"]),
                    borrowStatus: "Available",
                }
            },
            {
                book: {
                    id: expect.any(String),
                    title: "les Memoires d'un chat",
                    authors: ["Hiro Arikawa"],
                    categories: expect.arrayContaining(["Fiction", "Novel", "Adventure"]),
                    borrowStatus: "Available",
                }
            },
            {
                book: {
                    id: expect.any(String),
                    title: "Harry Potter 2",
                    authors: ["J.K Rowling"],
                    categories: ["Fiction", "Novel", "ChildrenStory", "Fantasy"],
                    borrowStatus: "Available",
                }
            },
            {
                book: {
                    id: expect.any(String),
                    title: "les Memoires d'un chat",
                    authors: ["Hiro Arikawa"],
                    categories: expect.arrayContaining(["Fiction", "Novel", "Adventure"]),
                    borrowStatus: "Available",
                }
            },
        ]));
    });
});
