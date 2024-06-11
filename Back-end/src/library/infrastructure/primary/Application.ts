import express, { Response, Request } from "express";
import { AddBook, AddBookInput } from "../../domain/features/AddBook";
import { InMemoryBooksRepository } from "../secondary/InMemoryBooksRepository";
import { FakeUUIDGenerator } from "../secondary/FakeUUIDGenerator";
import { BookCategory } from "../../domain/model/BookCategory";
import { BorrowStatus } from "../../domain/model/BorrowStatus";
import { Book } from "../../domain/model/Book";

export class Application {
  public expressApp = express();
  private bookRepository = new InMemoryBooksRepository();
  private uuidGenerator = new FakeUUIDGenerator();

  constructor() {
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
  }

  private toResponse(addedBook: Book): any {
    return {
      book: {
        id: addedBook.id,
        title: addedBook.title,
        authors: addedBook.authors,
        categories: addedBook.categories.map(this.fromDomainCategory),
        borrowStatus: this.fromDomaintoBorrowedStatus(addedBook.borrowStatus),
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

  private fromDomaintoBorrowedStatus(borrowStatus: BorrowStatus): string {
    return borrowStatus === BorrowStatus.Availaible ? "Available" : "Borrowed";
  }
}
