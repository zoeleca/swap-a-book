import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { randomUUID } from "node:crypto";
import { BookCategoryModel } from "../../src/domain/library/models/book-category.model";
import { Book, BorrowStatus, PrismaClient } from "@prisma/client";

let prisma = new PrismaClient();

describe("PrismaBooksRepository", () => {
  let libraryId = randomUUID();
  let userId = randomUUID();

  beforeAll(async () => {
    await prisma.user.create({
      data: {
        id: userId,
        email: `testuser-${userId}@example.com`,
        name: "Test User",
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
    await prisma.user.deleteMany({});
    await prisma.$disconnect();
  });
  describe("When Adding a book to a library", () => {
    it("should add a book to the database", async () => {
      const bookData: Book = {
        id: randomUUID(),
        title: "Harry Potter 2",
        authors: ["J.K Rowling"],
        categories: [
          BookCategoryModel.Fiction,
          BookCategoryModel.Novel,
          BookCategoryModel.Fantasy,
        ],
        borrowStatus: BorrowStatus.Available,
        libraryId,
      };

      await prisma.book.create({
        data: bookData,
      });

      const insertedBook = await prisma.book.findUnique({
        where: { id: bookData.id },
      });

      expect(insertedBook).toEqual(bookData);
    });
  });
  // describe("When Finding a book by Id", async () => {
  // });
  // describe("When Deleting a book by Id", async () => {
  // });
  // describe("When Listing a book by Id", async () => {
  // });
});
