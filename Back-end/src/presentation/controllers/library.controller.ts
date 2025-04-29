import {Request, Response} from "express";
import {PrismaBooksRepository} from "../../infrastructure/repositories/prisma-books.repository";
import {ListAllBooksUseCase} from "../../domain/library/features/list-all-books.use-case";
import {ensureUserExists} from "../../infrastructure/repositories/ensure-user-exists";

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
        return res.status(404).send({error: "No books found"});
      }

      res.status(200).json(books.map(this.toResponse));
    } catch (error) {
      res.status(500).send({error: "Failed to retrieve books"});
    }
  };

  public getLibrary = async (req: Request, res: Response) => {
    try {
      const auth = (req as any).auth;
      const auth0Id = auth?.payload?.sub;

      if (!auth0Id) {
        return res.status(401).json({error: "Unauthorized: missing user ID"});
      }

      const user = await ensureUserExists(auth0Id);

      if (!user || !user.library || !user.library.id) {
        return res.status(500).json({error: "Library not found for user"});
      }

      const books = await this.listLibraryBooks.execute(user.library.id);
      res.json(books);
    } catch (error) {
      console.error("Failed to fetch library:", error);
      res.status(500).json({error: "Internal server error"});
    }
  }

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
