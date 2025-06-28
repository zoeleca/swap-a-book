import { Router } from "express";
import { BookController } from "../controllers/book.controller";
import { BooksRepository } from "../../domain/library/interfaces/books.repository";
import { UuidGenerator } from "../../domain/library/interfaces/uuid-generator";
import { UsersRepository } from "../../domain/library/interfaces/user.repository";

export class BookRoutes {
  private router: Router;
  private bookController: BookController;

  constructor(
    private readonly bookRepository: BooksRepository,
    private readonly userRepository: UsersRepository,
    private readonly uuidGenerator: UuidGenerator,
    private readonly jwtCheck: any
  ) {
    this.router = Router();
    this.bookController = new BookController(
      this.bookRepository,
      this.userRepository,
      this.uuidGenerator
    );
    this.initializeRoutes();
  }

  public getRouter(): Router {
    return this.router;
  }

  private initializeRoutes() {
    this.router.post("/", this.jwtCheck, this.bookController.addBook);
    this.router.get("/:id",  this.bookController.getBookById);
    this.router.delete("/:id", this.jwtCheck, this.bookController.removeBook);
    this.router.get("/search", this.bookController.searchBooks);
    this.router.patch("/:id", this.jwtCheck, this.bookController.updateBook);
  }
}
