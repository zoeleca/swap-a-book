import express, { Response, Request } from "express";
import { AddBook, AddBookInput } from "../../domain/features/AddBook";
import { BookCategory } from "../../domain/model/BookCategory";
import { BorrowStatus } from "../../domain/model/BorrowStatus";
import { Book } from "../../domain/model/Book";
import {RemoveBook} from "../../domain/features/RemoveBook";
import {BooksRepository} from "../../domain/ports/BooksRepository";
import {UUIDGenerator} from "../../domain/ports/UUIDGenerator";
import {ListAllBooks} from "../../domain/features/ListAllBooks";

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

    this.expressApp.get("/library", async (request: Request, response: Response) => {
      const library = new ListAllBooks(this.bookRepository);
      const books = await library.execute();

      const jsonResponse = books.map(book => this.toResponse(book)); // Ensure proper formatting
      response.status(200).send(jsonResponse);
    });

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

    this.expressApp.get("/books/:id", async (request: Request, response: Response) => {
      const bookId = request.params.id;
      const book = await this.bookRepository.findById(bookId);

      if (!book) {
        response.status(404).send({ error: "Book not found" });
      } else {
        const jsonResponse = this.toResponse(book);
        response.status(200).send(jsonResponse);
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

  private async listAllBooks(): Promise<any> {
    const library = new ListAllBooks(this.bookRepository);
    const books = await library.execute();
    if (books.length === 0) {
    return books.map((book) => ({
      id: book.id,
      title: book.title,
      authors: book.authors,
      categories: book.categories.map(this.fromDomainCategory),
      borrowStatus: this.fromDomainToBorrowedStatus(book.borrowStatus),
    }))
    } else return [];
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
    const domainMap: Record<string, BookCategory> = {
      "Fantasy": BookCategory.Fantasy,
      "Fiction": BookCategory.Fiction,
      "ChildrenStory": BookCategory.ChildrenStory,
      "Adventure": BookCategory.Adventure,
      "Novel": BookCategory.Novel,
      "Mystery": BookCategory.Mystery,
      "Crime": BookCategory.Crime,
      "Detective": BookCategory.Detective,
    };
    const mappedCategory = domainMap[category];
    return mappedCategory || BookCategory.Unknown;
  }

  private fromDomainCategory(category: BookCategory): string {
    const categoryMap : Record<BookCategory, string> = {
      [BookCategory.Fiction]: "Fiction",
      [BookCategory.Fantasy]: "Fantasy",
      [BookCategory.ChildrenStory]: "ChildrenStory",
      [BookCategory.Adventure]: "Adventure",
      [BookCategory.Novel]: "Novel",
      [BookCategory.Mystery]: "Mystery",
      [BookCategory.Crime]: "Crime",
      [BookCategory.Detective]: "Detective",
      [BookCategory.Unknown]: "Unknown",
    }
    return categoryMap[category] ;
  }

  private fromDomainToBorrowedStatus(borrowStatus: BorrowStatus): string {
    return borrowStatus === BorrowStatus.Available ? "Available" : "Borrowed";
  }
}
