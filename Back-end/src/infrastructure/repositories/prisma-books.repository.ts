import { PrismaClient } from "@prisma/client";
import { BookModel } from "../../domain/library/models/book.model";
import { BorrowStatusModel } from "../../domain/library/models/borrow-status.model";
import { BooksRepository, BookWithOwner } from "../../domain/library/interfaces/books.repository";
import { BookStatusModel } from "../../domain/library/models/book-status.model";
import { BookLanguagesModel } from "../../domain/library/models/book-languages.model";
import { BookCategoriesModel } from "../../domain/library/models/book-categories.model";
import { randomUUID } from "node:crypto";

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
        status: book.status,
        languages: book.languages,
        coverImage: book.coverImage || null,
        description: book.description || null,
      },
    });
  }

  async update(id: string, updates: Partial<BookModel>): Promise<BookModel> {
    const updated = await prisma.book.update({
      where: { id },
      data: {
        title: updates.title,
        authors: updates.authors,
        categories: updates.categories,
        borrowStatus: updates.borrowStatus,
        status: updates.status,
        languages: updates.languages,
        coverImage: updates.coverImage ?? null,
        description: updates.description ?? null,
      },
    });

    return {
      id: updated.id,
      title: updated.title,
      authors: updated.authors,
      categories: updated.categories as BookCategoriesModel[],
      borrowStatus: updated.borrowStatus as BorrowStatusModel,
      status: updated.status as BookStatusModel,
      languages: updated.languages as BookLanguagesModel[],
      libraryId: updated.libraryId,
      coverImage: updated.coverImage ?? undefined,
      description: updated.description ?? undefined,
    };
  }


  async searchBooks(query: string): Promise<BookModel[]> {
    const books = await prisma.book.findMany({
      where: {
        OR: [
          {
            title: {
              contains: query,
              mode: "insensitive",
            },
          },
          {
            authors: {
              hasSome: [query],
            },
          },
        ],
      },
      select: {
        id: true,
        title: true,
        authors: true,
        categories: true,
        borrowStatus: true,
        status: true,
        languages: true,
        libraryId: true,
        coverImage: true,
        description: true,
      },
    });

    return books.map((book) => ({
      id: book.id,
      title: book.title,
      authors: book.authors,
      categories: book.categories as BookCategoriesModel[],
      borrowStatus: book.borrowStatus as BorrowStatusModel,
      status: book.status as BookStatusModel,
      languages: book.languages as BookLanguagesModel[],
      libraryId: book.libraryId,
      coverImage: book.coverImage ?? undefined,
      description: book.description ?? undefined,
    }));
  }

  async delete(book: BookModel): Promise<void> {
    await prisma.book.delete({
      where: { id: book.id },
    });
  }

  async getById(id: string): Promise<BookWithOwner | undefined> {
    const book = await prisma.book.findUnique({
      where: { id },
      include: {
        library: {
          include: {
            user: true
          }
        }
      }
    });

    if (!book) {
      console.warn(`Book not found for ID: ${id}`);
      return undefined;
    }

    return {
      id: book.id,
      title: book.title,
      authors: book.authors,
      categories: book.categories as BookCategoriesModel[],
      borrowStatus: book.borrowStatus as BorrowStatusModel,
      status: book.status as BookStatusModel,
      languages: book.languages as BookLanguagesModel[],
      libraryId: book.libraryId,
      coverImage: book.coverImage ?? undefined,
      description: book.description ?? undefined,
      library: {
        user: {
          name: book.library.user.name,
          auth0Id: book.library.user.auth0Id,
        },
      },
    };
  }

  async listLibraryBooks(libraryId: string): Promise<BookModel[]> {
    const books = await prisma.book.findMany({
      where: { libraryId },
      select: {
        id: true,
        title: true,
        authors: true,
        categories: true,
        borrowStatus: true,
        status: true,
        languages: true,
        libraryId: true,
        coverImage: true,
        description: true,
      },
    });

    return books.map((book) => ({
      id: book.id,
      title: book.title,
      authors: book.authors,
      categories: book.categories as BookCategoriesModel[],
      borrowStatus: book.borrowStatus as BorrowStatusModel,
      status: book.status as BookStatusModel,
      languages: book.languages as BookLanguagesModel[],
      libraryId: book.libraryId,
      coverImage: book.coverImage ?? undefined,
      description: book.description ?? undefined,
    }));
  }

  async listAllBooks(): Promise<BookModel[]> {
    const books = await prisma.book.findMany({
      where: { status: "Visible" },
      select: {
        id: true,
        title: true,
        authors: true,
        categories: true,
        borrowStatus: true,
        status: true,
        languages: true,
        libraryId: true,
        coverImage: true,
        description: true,
      },
    });

    return books.map((book) => ({
      id: book.id,
      title: book.title,
      authors: book.authors,
      categories: book.categories as BookCategoriesModel[],
      borrowStatus: book.borrowStatus as BorrowStatusModel,
      status: book.status as BookStatusModel,
      languages: book.languages as BookLanguagesModel[],
      libraryId: book.libraryId,
      coverImage: book.coverImage ?? undefined,
      description: book.description ?? undefined,
    }));
  }

  async createFakeUserAndLibrary(auth0Id: string): Promise<{ libraryId: string }> {
    const user = await prisma.user.create({
      data: {
        id: randomUUID(),
        auth0Id,
        name: "Test User",
        library: {
          create: {
            id: randomUUID(),
            name: "Test Library",
          },
        },
      },
      include: {
        library: true,
      },
    });

    return {
      libraryId: user.library!.id,
    };
  }
}
