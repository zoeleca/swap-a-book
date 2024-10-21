import { PrismaClient } from '@prisma/client';
import { Book } from '../../domain/library/model/Book';
import { BooksRepository } from '../../domain/library/ports/BooksRepository';
import { BookCategory } from '../../domain/library/model/BookCategory';
import { BorrowStatus } from '../../domain/library/model/BorrowStatus';

const prisma = new PrismaClient();

export class PrismaBooksRepository implements BooksRepository {
  async save(book: Book): Promise<void> {
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

  async delete(book: Book): Promise<void> {
    await prisma.book.delete({
      where: { id: book.id },
    });
  }

  async findById(id: string): Promise<Book | undefined> {
    console.log("Searching for book with ID:", id);
    const book = await prisma.book.findUnique({
      where: { id : id },
    });

    if (!book) return undefined;


    return {
      id: book.id,
      title: book.title,
      authors: book.authors,
      categories: book.categories as BookCategory[],
      borrowStatus: book.borrowStatus as BorrowStatus,
      libraryId: book.libraryId,
    };
  }

  async listAllBooks(): Promise<Book[]> {
    const books = await prisma.book.findMany();

    return books.map((book) => ({
      id: book.id,
      title: book.title,
      authors: book.authors,
      categories: book.categories as BookCategory[],
      borrowStatus: book.borrowStatus as BorrowStatus,
      libraryId: book.libraryId,
    }));
  }
}


