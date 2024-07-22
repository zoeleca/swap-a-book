import express, { Response, Request } from "express";
import { AddBook, AddBookInput } from "../../domain/features/AddBook";
import { BookCategory } from "../../domain/model/BookCategory";
import { BorrowStatus } from "../../domain/model/BorrowStatus";
import { Book } from "../../domain/model/Book";
import {RemoveBook} from "../../domain/features/RemoveBook";
import {BooksRepository} from "../../domain/ports/BooksRepository";
import {UUIDGenerator} from "../../domain/ports/UUIDGenerator";

export class Application {
  public expressApp = express();

  constructor(
  private readonly bookRepository: BooksRepository,
  private readonly uuidGenerator: UUIDGenerator
  ) {
    this.expressApp.use(express.json());

    this.expressApp.post(
      "/books",
      async (request: Request, response: Response) => {
        const addBook = new AddBook(this.bookRepository, this.uuidGenerator);

        const input = this.toAddBookInput(request);
        const addedBook = await addBook.execute(input);

        const jsonResponse = this.toResponse(addedBook);
        response.send(jsonResponse);
      }
    );

    this.expressApp.delete("/books/:id",
        async (request: Request, response: Response) => {
      const removeBook = new RemoveBook(this.bookRepository);
      const bookId = request.params.id;

      try {
        await removeBook.execute(bookId);
        response.status(204).send(); // No content
      } catch (error) {
        if (error instanceof Error) {
          response.status(404).send({ error: error.message });
        } else {
          response.status(500).send({ error: 'An unexpected error occurred' });
        }
      }
    });

  }

  start(port: number) {
    this.expressApp.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  }

  private toResponse(addedBook: Book): any {
    return {
      book: {
        id: addedBook.id,
        title: addedBook.title,
        authors: addedBook.authors,
        categories: addedBook.categories.map(this.fromDomainCategory),
        borrowStatus: this.fromDomainToBorrowedStatus(addedBook.borrowStatus),
      },
    };
  }

  private toAddBookInput(request: Request): AddBookInput {
    return {
      libraryId: request.body.libraryId,
      title: request.body.title,
      authors: request.body.authors,
      categories: request.body.categories.map(this.toDomainCategory),
    };
  }

  private toDomainCategory(category: string): BookCategory {
    if (category === "Fiction") {
      return BookCategory.Fiction;
    }
    if (category === "Fantasy") {
      return BookCategory.Fantasy;
    }
    return BookCategory.ChildrenStory;
  }

  private fromDomainCategory(category: BookCategory): string {
    if (category === BookCategory.Fiction) {
      return "Fiction";
    }
    if (category === BookCategory.Fantasy) {
      return "Fantasy";
    }

    return "ChildrenStory";
  }

  private fromDomainToBorrowedStatus(borrowStatus: BorrowStatus): string {
    return borrowStatus === BorrowStatus.Available ? "Available" : "Borrowed";
  }
}
