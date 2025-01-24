import { Request, Response } from "express";
import { PrismaBooksRepository } from "../../infrastructure/repositories/prisma-books.repository";
import { ListAllBooksUseCase } from "../../domain/library/features/list-all-books.use-case";
import { BookModel } from "../../domain/library/models/book.model";

export class LibraryController {
  private listLibraryBooks: ListAllBooksUseCase;

  constructor(private readonly bookRepository: PrismaBooksRepository) {
    this.listLibraryBooks = new ListAllBooksUseCase(this.bookRepository);
  }

  public listBooks = async (req: Request, res: Response) => {
    try {
      const libraryId = req.params.libraryId;
      const books = await this.listLibraryBooks.execute(libraryId);

      if (books.length === 0) {
        return res.status(404).send({ error: "No books found" });
      }

      res.status(200).json(books.map(this.toResponse));
    } catch (error) {
      res.status(500).send({ error: "Failed to retrieve books" });
    }
  };

  private toResponse(book: BookModel) {
    return {
      book: {
        id: book.id,
        title: book.title,
        authors: book.authors,
        categories: book.categories,
        borrowStatus: book.borrowStatus,
        status: book.status,
        languages: book.languages,
      },
    };
  }
}
