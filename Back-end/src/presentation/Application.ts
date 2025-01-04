// src/presentation/Application.ts
import express from "express";
import cors from "cors";
import { BookRoutes } from "./routes/book-routes";
import { BooksRepository } from "../domain/library/interfaces/BooksRepository";
import { UUIDGenerator } from "../domain/library/interfaces/UUIDGenerator";
import { LibraryRoutes } from "./routes/library-routes";

export class Application {
  public expressApp = express();

  constructor(
    private readonly bookRepository: BooksRepository, // Make the book repository a dependency
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
    const bookRoutes = new BookRoutes(this.bookRepository, this.uuidGenerator);
    this.expressApp.use("/books", bookRoutes.getRouter());

    const libraryRoutes = new LibraryRoutes(this.bookRepository);
    this.expressApp.use("/library", libraryRoutes.getRouter());
  }
}
