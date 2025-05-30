import { Request, Response } from "express";
import { ListAllBooksUseCase } from "../../domain/library/features/list-all-books.use-case";
import { PrismaBooksRepository } from "../../infrastructure/repositories/prisma-books.repository";
import { PrismaUsersRepository } from "../../infrastructure/repositories/prisma-users.respository";

export class LibraryController {
  private listLibraryBooks: ListAllBooksUseCase;

  constructor(
    private readonly bookRepository: PrismaBooksRepository,
    private readonly userRepository: PrismaUsersRepository
  ) {
    this.listLibraryBooks = new ListAllBooksUseCase(this.bookRepository);
  }

  public listBooks = async (req: Request, res: Response) => {
    try {
      const books = await this.listLibraryBooks.getAllBooks();
      res.json(books);
    } catch (error) {
      console.error("Failed to fetch all books:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  };

  public getBooksForAuthenticatedUser = async (req: Request, res: Response) => {
    try {
      const auth0Id = (req as any).auth?.payload?.sub;

      if (!auth0Id) {
        return res.status(401).json({ error: "Unauthorized: missing user ID" });
      }

      let user = await this.userRepository.findUserByAuth0Id(auth0Id);

      if (!user) {
        // ✅ Create user and library automatically
        const created = await this.userRepository.createUserWithLibrary(auth0Id);
        user = { libraryId: created.libraryId };
      }

      const books = await this.bookRepository.listLibraryBooks(user.libraryId);
      res.json(books);
    } catch (error) {
      console.error("Failed to fetch authenticated user library:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  };

  public getLibraryById = async (req: Request, res: Response) => {
    try {
      const libraryId = req.params.libraryId;
      if (!libraryId) {
        return res.status(400).json({ error: "Missing library ID" });
      }

      const books = await this.bookRepository.listLibraryBooks(libraryId);
      res.json(books);
    } catch (error) {
      console.error("Failed to fetch library by ID:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  };
}
