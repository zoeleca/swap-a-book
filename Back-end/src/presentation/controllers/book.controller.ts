import {Request, Response} from "express";
import {AddBookUseCase} from "../../domain/library/features/add-book.use-case";
import {RemoveBookUseCase} from "../../domain/library/features/remove-book.use-case";
import {UuidGenerator} from "../../domain/library/interfaces/uuid-generator";
import {BookModel} from "../../domain/library/models/book.model";
import {PrismaBooksRepository} from "../../infrastructure/repositories/prisma-books.repository";

export class BookController {
  private addBookUseCase: AddBookUseCase;
  private removeBookUseCase: RemoveBookUseCase;

  constructor(
    private readonly bookRepository: PrismaBooksRepository,
    private readonly uuidGenerator: UuidGenerator
  ) {
    this.addBookUseCase = new AddBookUseCase(
      this.bookRepository,
      this.uuidGenerator
    );
    this.removeBookUseCase = new RemoveBookUseCase(this.bookRepository);
  }

  public addBook = async (req: Request, res: Response) => {
    try {
      const auth0Id = (req as any).auth?.payload?.sub;

      if (!auth0Id) {
        return res.status(401).send({error: "Unauthorized: No Auth0 ID found"});
      }

      // Find the user by auth0Id
      const user = await this.bookRepository.findUserByAuth0Id(auth0Id);

      if (!user || !user.libraryId) {
        return res.status(404).send({error: "User or user's library not found"});
      }

      const {title, authors, categories, languages} = req.body;

      const addedBook = await this.addBookUseCase.execute({
        libraryId: user.libraryId,
        title,
        authors,
        categories,
        languages,
      });

      res.status(201).json(this.toResponse(addedBook));
    } catch (error) {
      console.error("Add book error:", error);
      res.status(500).send({error: "Failed to add book"});
    }
  };

  // Get book by ID
  public getBookById = async (req: Request, res: Response) => {
    try {
      const bookId = req.params.id;
      const book = await this.bookRepository.getById(bookId);

      if (!book) {
        return res.status(404).send({error: "BookModel not found"});
      }

      res.status(200).json(this.toResponse(book));
    } catch (error) {
      res.status(500).send({error: "Failed to retrieve book"});
    }
  };

  public searchBooks = async (req: Request, res: Response) => {
    try {
      const query = req.query.q as string;

      if (!query) {
        return res.status(400).send({error: "Missing search query parameter `q`."});
      }

      const books = await this.bookRepository.searchBooks(query);

      res.status(200).json(books.map(this.toResponse));
    } catch (error) {
      console.error("Search book error:", error);
      res.status(500).send({error: "Failed to search books"});
    }
  };


  // Remove a book
  public removeBook = async (req: Request, res: Response) => {
    try {
      const bookId = req.params.id;
      await this.removeBookUseCase.execute(bookId);

      res.status(204).send(); // No content
    } catch (error) {
      res.status(500).send({error: "Failed to remove book"});
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
