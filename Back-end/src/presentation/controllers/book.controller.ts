// src/presentation/controllers/BookController.ts
import { Request, Response } from "express";
import { AddBook } from "../../domain/library/features/AddBook";
import { RemoveBook } from "../../domain/library/features/RemoveBook";
import { PrismaBooksRepository } from "../../infrastructure/repositories/PrismaBooksRepository";
import { UUIDGenerator } from "../../domain/library/interfaces/UUIDGenerator";

export class BookController {
  private addBookUseCase: AddBook;
  private removeBookUseCase: RemoveBook;

  constructor(
    private readonly bookRepository: PrismaBooksRepository,
    private readonly uuidGenerator: UUIDGenerator
  ) {
    this.addBookUseCase = new AddBook(this.bookRepository, this.uuidGenerator);
    this.removeBookUseCase = new RemoveBook(this.bookRepository);
  }

  // Add a new book
  public addBook = async (req: Request, res: Response) => {
    try {
      const { libraryId, title, authors, categories } = req.body;

      // Execute the AddBook use case
      const addedBook = await this.addBookUseCase.execute({
        libraryId,
        title,
        authors,
        categories,
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
        return res.status(404).send({ error: "Book not found" });
      }

      res.status(200).json(this.toResponse(book));
    } catch (error) {
      res.status(500).send({ error: "Failed to retrieve book" });
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

  // Helper function to format the response
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
