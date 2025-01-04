import { Request, Response, Router } from "express";
import { AddBook } from "../../../domain/library/features/AddBook";
import { PrismaBooksRepository } from "../../adapters/BookRepository";
import { UUIDGenerator } from "../../../domain/library/ports/UUIDGenerator";
import { toDomainCategory } from "../mapper/book/category.mapper";

export class AddBookController {
  public router: Router;

  constructor(
    private readonly bookRepository: PrismaBooksRepository,
    private readonly uuidGenerator: UUIDGenerator
  ) {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post("/books", this.addBook.bind(this));
  }

  private async addBook(request: Request, response: Response) {
    const addBook = new AddBook(this.bookRepository, this.uuidGenerator);
    const input = this.toAddBookInput(request);

    try {
      const addedBook = await addBook.execute(input);
      const jsonResponse = this.toResponse(addedBook);
      response.status(200).send(jsonResponse);
    } catch (error) {
      if (error instanceof Error) {
        response.status(404).send({ error: error.message });
      } else {
        response.status(500).send({ error: "An unexpected error occurred" });
      }
    }
  }

  private toAddBookInput(request: Request) {
    return {
      libraryId: request.body.libraryId,
      title: request.body.title,
      authors: request.body.authors,
      categories: request.body.categories.map(toDomainCategory),
    };
  }

  private toResponse(addedBook: any) {
    return {
      book: {
        id: addedBook.id,
        title: addedBook.title,
        authors: addedBook.authors,
        categories: addedBook.categories,
        borrowStatus: addedBook.borrowStatus,
      },
    };
  }
}
