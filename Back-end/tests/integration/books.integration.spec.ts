import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { randomUUID } from "node:crypto";
import { BookCategoriesModel } from "../../src/domain/library/models/book-categories.model";
import { Book, BookStatus, BorrowStatus, PrismaClient } from "@prisma/client";
import { BookLanguagesModel } from "../../src/domain/library/models/book-languages.model";

let prisma = new PrismaClient();

describe("PrismaBooksRepository", () => {
  let libraryId = randomUUID();
  let userId = randomUUID();

  beforeAll(async () => {
    await prisma.user.create({
      data: {
        id: userId,
        name: "Test User",
        auth0Id: "anyString",
      },
    });

    await prisma.library.create({
      data: {
        id: libraryId,
        name: "Test LibraryModel",
        userId,
      },
    });
  });

  afterAll(async () => {
    await prisma.book.deleteMany({});
    await prisma.library.deleteMany({});
    await prisma.$disconnect();
  });

  describe("When Adding a book to a library", () => {
    it("should add a book to the database", async () => {
      const bookData: Book = {
        id: randomUUID(),
        title: "Harry Potter 2",
        authors: ["J.K Rowling"],
        categories: [
          BookCategoriesModel.Fiction,
          BookCategoriesModel.Novel,
          BookCategoriesModel.Fantasy,
        ],
        languages: [BookLanguagesModel.English],
        borrowStatus: BorrowStatus.Available,
        status: BookStatus.Visible,
        libraryId,
        borrowedAt: null,
        borrowedBy: null,
        coverImage: null,
        description: null,
      };


      await prisma.book.create({
        data: bookData,
      });

      const insertedBook = await prisma.book.findUnique({
        where: {id: bookData.id},
      });

      expect(insertedBook).toEqual(bookData);
    });
  });

  describe.todo("When Finding a book by Id", async () => {
  });
  describe.todo("When Deleting a book by Id", async () => {
  });
  describe.todo("When Listing a book by Id", async () => {
  });
});
