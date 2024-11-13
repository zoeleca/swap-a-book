import {describe, expect, it} from "vitest";
import {randomUUID} from "node:crypto";
import {BookCategory} from '../../src/domain/library/model/BookCategory';
import {Book, BorrowStatus, PrismaClient} from "@prisma/client";

let prisma = new PrismaClient();

describe("PrismaBooksRepository", () => {
  let libraryId = randomUUID();
  describe("When Adding a book to a library", () => {
    it("should add a book to the database", async () => {

      const bookData: Book = {
        id: randomUUID(),
        title: "Harry Potter 2",
        authors: ["J.K Rowling"],
        categories: [BookCategory.FICTION, BookCategory.NOVEL, BookCategory.FANTASY],
        borrowStatus: BorrowStatus.AVAILABLE,
        libraryId: libraryId
      };

      await prisma.book.create({
        data: bookData,
      });

      const insertedBook = await prisma.book.findUnique({
        where: {id: bookData.id},
      });

      expect(insertedBook).toEqual(bookData);
    });
  })
  describe("When Finding a book by Id", async () => {
  });
  describe("When Deleting a book by Id", async () => {
  });
  describe("When Listing a book by Id", async () => {
  });
});
