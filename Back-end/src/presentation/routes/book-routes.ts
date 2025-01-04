// src/presentation/routes/book-routes.ts
import { Router } from "express";
import { BookController } from "../controllers/book.controller";
import { BooksRepository } from "../../domain/library/interfaces/BooksRepository";
import { UUIDGenerator } from "../../domain/library/interfaces/UUIDGenerator";

export class BookRoutes {
  private router: Router;
  private bookController: BookController;

  constructor(
    private readonly bookRepository: BooksRepository,
    private readonly uuidGenerator: UUIDGenerator
  ) {
    this.router = Router();
    this.bookController = new BookController(
      this.bookRepository,
      this.uuidGenerator
    ); // Pass the dependencies to the controller
    this.initializeRoutes();
  }

  public getRouter(): Router {
    return this.router;
  }

  private initializeRoutes() {
    this.router.post("/", this.bookController.addBook);
    this.router.get("/:id", this.bookController.getBookById);
    this.router.delete("/:id", this.bookController.removeBook);
  }
}
