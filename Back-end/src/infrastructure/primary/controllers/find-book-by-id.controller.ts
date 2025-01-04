import { Request, Response, Router } from "express";
import { PrismaBooksRepository } from "../../adapters/BookRepository";

export class FindBookByIdController {
  public router: Router;

  constructor(private readonly bookRepository: PrismaBooksRepository) {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get("/books/:id", this.findBookById.bind(this));
  }

  private async findBookById(request: Request, response: Response) {
    const bookId = request.params.id;

    try {
      const book = await this.bookRepository.findById(bookId);
      const jsonResponse = this.toResponse(book);
      response.status(200).send(jsonResponse);
    } catch (error) {
      if (error instanceof Error) {
        response.status(404).send({ error: "Book not found" });
      } else {
        response.status(500).send({ error: "An unexpected error occurred" });
      }
    }
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
