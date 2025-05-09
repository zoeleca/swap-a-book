import express, {NextFunction, Request, Response} from "express";
import {auth} from "express-oauth2-jwt-bearer";
import cors from "cors";
import {BookRoutes} from "./routes/book.routes";
import {BooksRepository} from "../domain/library/interfaces/books.repository";
import {UuidGenerator} from "../domain/library/interfaces/uuid-generator";
import {LibraryRoutes} from "./routes/library.routes";
import dotenv from "dotenv";
import {UserRoutes} from "./routes/user.routes";

dotenv.config();

export class Application {
  public expressApp = express();

  constructor(
    private readonly bookRepository: BooksRepository,
    private readonly uuidGenerator: UuidGenerator,
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
    this.expressApp.use(cors({
      origin: ["http://localhost:3000", "http://localhost:5173"],
    }));

  }

  private initializeControllers() {
    const jwtCheck =
      process.env.NODE_ENV === "test"
        ? (req: Request, res: Response, next: NextFunction) => {
          (req as any).auth = {
            payload: {
              sub: "test-user-id",
            },
          };
          next();
        }
        : auth({
          audience: process.env.AUTH0_AUDIENCE,
          issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
          tokenSigningAlg: "RS256",
        });

    const bookRoutes = new BookRoutes(this.bookRepository, this.uuidGenerator, jwtCheck);
    this.expressApp.use("/books", bookRoutes.getRouter());


    const libraryRoutes = new LibraryRoutes(this.bookRepository, jwtCheck);
    this.expressApp.use("/library", libraryRoutes.getRouter());
    this.expressApp.use("/", libraryRoutes.getRouter());

    const userRoutes = new UserRoutes();
    this.expressApp.use("/user", jwtCheck, userRoutes.getRouter());
  }
}
