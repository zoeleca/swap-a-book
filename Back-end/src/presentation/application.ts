// src/presentation/application.ts
import express from "express";
import cors from "cors";
import { BookRoutes } from "./routes/book.routes";
import { BooksRepository } from "../domain/library/interfaces/books.repository";
import { UuidGenerator } from "../domain/library/interfaces/uuid-generator";
import { LibraryRoutes } from "./routes/library.routes";
import { auth } from "express-openid-connect";
import { AuthenticationRoutes } from "./routes/authentication.routes";
import { UserRepository } from "../domain/library/interfaces/user.repository";

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
        origin: ["http://localhost:3000", "http://localhost:5173"],
      })
    );

    const config = {
      authRequired: false,
      auth0Logout: true,
      secret: "a long, randomly-generated string stored in env",
      baseURL: "http://localhost:8000",
      clientID: "j8saAjWhW63FZHmiqptUDS72qEHI5EeE",
      issuerBaseURL: "https://dev-b77oxg884oraklfh.eu.auth0.com",
    };

    this.expressApp.use(auth(config));

    this.expressApp.get("/", (req, res) => {
      res.send(req.oidc.isAuthenticated() ? "Logged in" : "Logged out");
    });
  }

  private initializeControllers() {
    const bookRoutes = new BookRoutes(this.bookRepository, this.uuidGenerator);
    this.expressApp.use("/books", bookRoutes.getRouter());

    const libraryRoutes = new LibraryRoutes(this.bookRepository);
    this.expressApp.use("/library", libraryRoutes.getRouter());

    const authenticationRoutes = new AuthenticationRoutes(this.userRepository);
    this.expressApp.use("/auth", authenticationRoutes.getRouter());
  }
}
