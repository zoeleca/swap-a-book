import { Request, Response, Router } from "express";
import { PrismaBooksRepository } from "../../adapters/BookRepository";
import { fromDomainCategory } from "../mapper/book/category.mapper";
import { ListAllBooks } from "../../../domain/library/features/ListAllBooks";
import { fromDomainToBorrowedStatus } from "../mapper/book/borrowed-status.mapper";

export class ListLibraryBooksController {
  public router: Router;

  constructor(private readonly bookRepository: PrismaBooksRepository) {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(
      "/library/:libraryId/books",
      this.listLibraryBooks.bind(this)
    );
  }

  private async listLibraryBooks(request: Request, response: Response) {
    const libraryId = request.params.libraryId;

    const books = await this.bookRepository.listAllBooks(libraryId);

    if (!books || books.length === 0) {
      response.status(404).send({ error: "No books found for this library" });
    } else {
      const jsonResponse = books.map((book) => this.toResponse(book)); // Format the response
      response.status(200).send(jsonResponse);
    }
  }

  private async listAllBooks(libraryId: string): Promise<any> {
    const library = new ListAllBooks(this.bookRepository);
    const books = await library.execute(libraryId);
    if (books.length === 0) {
      return books.map((book) => ({
        id: book.id,
        title: book.title,
        authors: book.authors,
        categories: book.categories.map(fromDomainCategory),
        borrowStatus: fromDomainToBorrowedStatus(book.borrowStatus),
      }));
    } else return [];
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
