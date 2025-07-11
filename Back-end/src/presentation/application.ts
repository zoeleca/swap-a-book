import express, { NextFunction, Request, Response } from "express";
import { auth } from "express-oauth2-jwt-bearer";
import cors, { CorsOptions } from "cors";
import { BookRoutes } from "./routes/book.routes";
import { BooksRepository } from "../domain/library/interfaces/books.repository";
import { UuidGenerator } from "../domain/library/interfaces/uuid-generator";
import { LibraryRoutes } from "./routes/library.routes";
import dotenv from "dotenv";
import { UserRoutes } from "./routes/user.routes";
import { UsersRepository } from "../domain/library/interfaces/user.repository";
import adminRoutes from "./routes/admin.routes";

dotenv.config({
  path: process.env.NODE_ENV === "production" ? ".env.production" : ".env.development",
});


export class Application {
  public expressApp = express();

  constructor(
    private readonly bookRepository: BooksRepository,
    private readonly userRepository: UsersRepository,
    private readonly uuidGenerator: UuidGenerator,
  ) {
    this.initializeMiddleware();
    this.initializeRoutes();
  }

  public start(port: number) {
    this.expressApp.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  }

  private initializeMiddleware() {
      const allowedOrigins: string[] = [
        process.env.FRONT_END,
        process.env.FRONT_TEST,
        process.env.VITE_API_URL,
        process.env.PROD_FRONTEND_URL,
      ].filter((origin): origin is string => Boolean(origin)); // filtre et garantit les types string

      const corsOptions: CorsOptions = {
        origin: allowedOrigins,
      };

      this.expressApp.use(express.json());
      this.expressApp.use(cors(corsOptions));
    }

  private initializeRoutes() {
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

    const bookRoutes = new BookRoutes(
      this.bookRepository,
      this.userRepository,
      this.uuidGenerator,
      jwtCheck
    );
    this.expressApp.use("/books", bookRoutes.getRouter());

    const libraryRoutes = new LibraryRoutes(this.bookRepository, this.userRepository, jwtCheck);
    this.expressApp.use("/library", libraryRoutes.getRouter());
    this.expressApp.use("/", libraryRoutes.getRouter());

    const userRoutes = new UserRoutes(this.userRepository, jwtCheck);
    this.expressApp.use("/user", jwtCheck, userRoutes.getRouter());

    this.expressApp.get("*", (req, res) => {
      console.warn("Route not found:", req.method, req.originalUrl);
      res.status(404).json({ error: "Route not found" });
    });
    this.expressApp.use("/admin", adminRoutes);
  }
}
