import { RequestHandler, Router } from "express";
import { LibraryController } from "../controllers/library.controller";
import { PrismaBooksRepository } from "../../infrastructure/repositories/prisma-books.repository";
import { PrismaUsersRepository } from "../../infrastructure/repositories/prisma-users.respository";

export class LibraryRoutes {
  private router: Router;
  private libraryController: LibraryController;

  constructor(private readonly bookRepository: PrismaBooksRepository,
              private readonly userRepository: PrismaUsersRepository,
              private readonly jwtCheck: RequestHandler) {
    this.router = Router();
    this.libraryController = new LibraryController(this.bookRepository, this.userRepository);
    this.initializeRoutes();
  }

  public getRouter(): Router {
    return this.router;
  }

  private initializeRoutes() {
    this.router.get("/:libraryId/books", this.jwtCheck, this.libraryController.getLibraryById);
    this.router.get("/books", this.jwtCheck, this.libraryController.getBooksForAuthenticatedUser);
    this.router.get("/", this.libraryController.listBooks);

  }
}
