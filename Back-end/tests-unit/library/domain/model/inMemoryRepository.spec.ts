import { describe, expect, it } from "vitest";
import { InMemoryBooksRepository } from "../../../../src/library/infrastructure/secondary/InMemoryBooksRepository";
import { Book } from "../../../../src/library/domain/model/Book";
import { BookCategory } from "../../../../src/library/domain/model/BookCategory";
import { BorrowStatus } from "../../../../src/library/domain/model/BorrowStatus";
import {randomUUID} from "node:crypto";

describe("InMemoryBooksRepository", () => {
    it("should store multiple books without overwriting", async () => {
        const repository = new InMemoryBooksRepository();

        const book1 = new Book(
            randomUUID(),
            "Harry Potter",
            ["J.K Rowling"],
            [BookCategory.Fiction, BookCategory.Fantasy],
            BorrowStatus.Available
        );

        const book2 = new Book(
            randomUUID(),
            "Lord of the Rings",
            ["J.R.R. Tolkien"],
            [BookCategory.Fiction, BookCategory.Adventure],
            BorrowStatus.Borrowed
        );

        await repository.save(book1);
        await repository.save(book2);

        const books = await repository.listAllBooks();

        expect(books).toHaveLength(2); // Should contain both books
        console.log(books)
        expect(books).toContainEqual(book1);
        expect(books).toContainEqual(book2);
    });
});
