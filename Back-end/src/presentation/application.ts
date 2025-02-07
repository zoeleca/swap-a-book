// src/presentation/application.ts
import express from "express";
import cors from "cors";
import { BookRoutes } from "./routes/book.routes";
import { BooksRepository } from "../domain/library/interfaces/books.repository";
import { UuidGenerator } from "../domain/library/interfaces/uuid-generator";
import { LibraryRoutes } from "./routes/library.routes";
import { UserRepository } from "../domain/user/interfaces/user.repository";

export class Application {
  public expressApp = express();

  constructor(
    private readonly bookRepository: BooksRepository, // Make the book repository a dependency
    private readonly uuidGenerator: UuidGenerator,
    private readonly userRepository: UserRepository
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
        origin: ["http://localhost", "http://localhost:3000"],
      })
    );
  }

  private initializeControllers() {
    const bookRoutes = new BookRoutes(this.bookRepository, this.uuidGenerator);
    this.expressApp.use("/books", bookRoutes.getRouter());

    const libraryRoutes = new LibraryRoutes(this.bookRepository);
    this.expressApp.use("/library", libraryRoutes.getRouter());

    const authRoutes = new AuthRoutes();
    this.expressApp.use("/login", authRoutes.getRouter());
  }
}
