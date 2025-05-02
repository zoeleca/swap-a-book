import {PrismaClient} from "@prisma/client";
import {BookModel} from "../../domain/library/models/book.model";
import {BorrowStatusModel} from "../../domain/library/models/borrow-status.model";
import {BooksRepository} from "../../domain/library/interfaces/books.repository";
import {BookStatusModel} from "../../domain/library/models/book-status.model";
import {BookLanguagesModel} from "../../domain/library/models/book-languages.model";
import {BookCategoriesModel} from "../../domain/library/models/book-categories.model";

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
      },
    });
  }

  async findUserByAuth0Id(auth0Id: string): Promise<{ libraryId: string } | null> {
    const user = await prisma.user.findUnique({
      where: {auth0Id},
      include: {library: true},
    });

    if (!user || !user.library) return null;

    return {libraryId: user.library.id};
  }


  async delete(book: BookModel): Promise<void> {
    await prisma.book.delete({
      where: {id: book.id},
    });
  }

  async getById(id: string): Promise<BookModel | undefined> {
    const book = await prisma.book.findUnique({
      where: {id: id},
    });

    if (!book) return undefined;

    return {
      id: book.id,
      title: book.title,
      authors: book.authors,
      categories: book.categories as BookCategoriesModel[],
      borrowStatus: book.borrowStatus as BorrowStatusModel,
      status: book.status as BookStatusModel,
      languages: book.languages as BookLanguagesModel[],
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
      categories: book.categories as BookCategoriesModel[],
      borrowStatus: book.borrowStatus as BorrowStatusModel,
      status: book.status as BookStatusModel,
      languages: book.languages as BookLanguagesModel[],
      libraryId: book.libraryId,
    }));
  }
}
