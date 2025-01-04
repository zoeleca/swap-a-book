import { PrismaClient } from "@prisma/client";
import { BookModel } from "../../domain/library/models/book.model";
import { BookCategoryModel } from "../../domain/library/models/book-category.model";
import { BorrowStatusModel } from "../../domain/library/models/borrow-status.model";
import { BooksRepository } from "../../domain/library/interfaces/books.repository";

const prisma = new PrismaClient();

export class PrismaBooksRepository implements BooksRepository {
  async save(book: BookModel): Promise<void> {
    await prisma.book.create({
      data: {
        id: book.id,
        title: book.title,
        authors: book.authors,
        categories: book.categories,
        borrowStatus: book.borrowStatus,
        libraryId: book.libraryId,
      },
    });
  }

  async delete(book: BookModel): Promise<void> {
    await prisma.book.delete({
      where: { id: book.id },
    });
  }

  async getById(id: string): Promise<BookModel | undefined> {
    const book = await prisma.book.findUnique({
      where: { id: id },
    });

    if (!book) return undefined;

    return {
      id: book.id,
      title: book.title,
      authors: book.authors,
      categories: book.categories as BookCategoryModel[],
      borrowStatus: book.borrowStatus as BorrowStatusModel,
      libraryId: book.libraryId,
    };
  }

  async listAllBooks(libraryId: string): Promise<BookModel[]> {
    const books = await prisma.book.findMany({
      where: {
        libraryId: libraryId,
      },
    });

    return books.map((book) => ({
      id: book.id,
      title: book.title,
      authors: book.authors,
      categories: book.categories as BookCategoryModel[],
      borrowStatus: book.borrowStatus as BorrowStatusModel,
      libraryId: book.libraryId,
    }));
  }
}
