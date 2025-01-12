import { Request, Response } from "express";
import { AddBookUseCase } from "../../domain/library/features/add-book.use-case";
import { RemoveBookUseCase } from "../../domain/library/features/remove-book.use-case";
import { UuidGenerator } from "../../domain/library/interfaces/uuid-generator";
import { BookModel } from "../../domain/library/models/book.model";
import { PrismaBooksRepository } from "../../infrastructure/repositories/prisma-books.repository";

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

  // Add a new book
  public addBook = async (req: Request, res: Response) => {
    try {
      const { libraryId, title, authors, categories, languages } = req.body;

      // Execute the AddBookUseCase use case
      const addedBook = await this.addBookUseCase.execute({
        libraryId,
        title,
        authors,
        categories,
        languages,
      });

      res.status(201).json(this.toResponse(addedBook));
    } catch (error) {
      res.status(500).send({ error: "Failed to add book" });
    }
  };

  // Get book by ID
  public getBookById = async (req: Request, res: Response) => {
    try {
      const bookId = req.params.id;
      const book = await this.bookRepository.getById(bookId);

      if (!book) {
        return res.status(404).send({ error: "BookModel not found" });
      }

      res.status(200).json(this.toResponse(book));
    } catch (error) {
      res.status(500).send({ error: "Failed to retrieve book" });
    }
  };

  public findAllVisibleBooks = async (req: Request, res: Response) => {
    try {
      const repository = await this.bookRepository.findAllVisibleBooks();
      const books = repository.map((book) => this.toResponse(book));

      if (books.length === 0) {
        return res.status(404).send({ error: "Books not found" });
      }

      res.status(200).json(books);
    } catch (error) {
      res.status(500).send({ error: "Failed to retrieve books" });
    }
  };

  // Remove a book
  public removeBook = async (req: Request, res: Response) => {
    try {
      const bookId = req.params.id;
      await this.removeBookUseCase.execute(bookId);

      res.status(204).send(); // No content
    } catch (error) {
      res.status(500).send({ error: "Failed to remove book" });
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
