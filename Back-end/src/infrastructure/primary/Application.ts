import express from "express";
import cors from "cors";
import { PrismaBooksRepository } from "../adapters/BookRepository";
import { UUIDGenerator } from "../../domain/library/ports/UUIDGenerator";
import { AddBookController } from "./controllers/add-book.controller";
import { FindBookByIdController } from "./controllers/find-book-by-id.controller";
import { ListLibraryBooksController } from "./controllers/list-library-books.controller";
import { RemoveBookController } from "./controllers/remove-book.controller";

export class Application {
  public expressApp = express();

  constructor(
    private readonly bookRepository: PrismaBooksRepository,
    private readonly uuidGenerator: UUIDGenerator
  ) {
    this.initializeMiddleware();
    this.initializeControllers();
  }

  public start(port: number) {
    this.expressApp.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  }

  private initializeMiddleware() {
    this.expressApp.use(express.json());
    this.expressApp.use(
      cors({
        origin: ["http://localhost", "http://localhost:80"],
      })
    );
  }

  private initializeControllers() {
    const addBookController = new AddBookController(
      this.bookRepository,
      this.uuidGenerator
    );
    this.expressApp.use(addBookController.router);

    const removeBookController = new RemoveBookController(this.bookRepository);
    this.expressApp.use(removeBookController.router);

    const findBookById = new FindBookByIdController(this.bookRepository);
    this.expressApp.use(findBookById.router);

    const listLibraryBooksController = new ListLibraryBooksController(
      this.bookRepository
    );
    this.expressApp.use(listLibraryBooksController.router);
  }
}
