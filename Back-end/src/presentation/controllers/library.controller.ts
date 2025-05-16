import { Request, Response } from "express";
import { ListAllBooksUseCase } from "../../domain/library/features/list-all-books.use-case";
import { PrismaBooksRepository } from "../../infrastructure/repositories/prisma-books.repository";

export class LibraryController {
  private listLibraryBooks: ListAllBooksUseCase;

  constructor(private readonly bookRepository: PrismaBooksRepository) {
    this.listLibraryBooks = new ListAllBooksUseCase(this.bookRepository);
  }

  public listBooks = async (req: Request, res: Response) => {
    try {
      const books = await this.listLibraryBooks.getAllBooks();
      res.json(books);
    } catch (error) {
      console.error("Failed to fetch library:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  };

  public getLibrary = async (req: Request, res: Response) => {
    try {
      const auth = (req as any).auth;
      const auth0Id = auth?.payload?.sub;

      if (!auth0Id) {
        return res.status(401).json({ error: "Unauthorized: missing user ID" });
      }

      const user = await this.bookRepository.findUserByAuth0Id(auth0Id);
      if (!user) {
        return res.status(401).json({ error: "User not found" });
      }

      const books = await this.bookRepository.listLibraryBooks(user.libraryId);
      res.json(books);
    } catch (error) {
      console.error("Failed to fetch library:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  };

  private toResponse(book: any) {
    return {
      book: {
        id: book.id,
        title: book.title,
        authors: book.authors,
        categories: book.categories,
        borrowStatus: book.borrowStatus,
      },
    };
  }
}
