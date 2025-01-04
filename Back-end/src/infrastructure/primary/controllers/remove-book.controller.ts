import { Request, Response, Router } from "express";
import { PrismaBooksRepository } from "../../adapters/BookRepository";
import { RemoveBook } from "../../../domain/library/features/RemoveBook";

export class RemoveBookController {
  public router: Router;

  constructor(private readonly bookRepository: PrismaBooksRepository) {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.delete("/books/:id", this.removeBook.bind(this));
  }

  private async removeBook(request: Request, response: Response) {
    const removeBook = new RemoveBook(this.bookRepository);
    const bookId = request.params.id;

    try {
      await removeBook.execute(bookId);
      response.status(204).send();
    } catch (error) {
      if (error instanceof Error) {
        response.status(404).send({ error: error.message });
      } else {
        response.status(500).send({ error: "An unexpected error occurred" });
      }
    }
  }
}
