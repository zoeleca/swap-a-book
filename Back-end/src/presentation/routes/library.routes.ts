import {RequestHandler, Router} from "express";
import {LibraryController} from "../controllers/library.controller";
import {PrismaBooksRepository} from "../../infrastructure/repositories/prisma-books.repository";

export class LibraryRoutes {
  private router: Router;
  private libraryController: LibraryController;

  constructor(private readonly bookRepository: PrismaBooksRepository,
              private readonly jwtCheck: RequestHandler) {
    this.router = Router();
    this.libraryController = new LibraryController(this.bookRepository); // Pass the dependencies to the controller
    this.initializeRoutes();
  }

  public getRouter(): Router {
    return this.router;
  }

  private initializeRoutes() {
    this.router.get("/:libraryId/books", this.libraryController.getLibrary);
    this.router.get("/books", this.jwtCheck, this.libraryController.getLibrary);


    this.router.get("/", this.libraryController.listBooks);

  }
}
