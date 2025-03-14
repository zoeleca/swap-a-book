import express from "express";
import cors from "cors";
import {BookRoutes} from "./routes/book.routes";
import {BooksRepository} from "../domain/library/interfaces/books.repository";
import {UuidGenerator} from "../domain/library/interfaces/uuid-generator";
import {LibraryRoutes} from "./routes/library.routes";
import {UserRepository} from "../domain/library/interfaces/user.repository";
import dotenv from "dotenv";
import {auth, requiresAuth} from "express-openid-connect";
import {AuthenticationRoutes} from "./routes/authentication.routes";

dotenv.config();

export class Application {
  public expressApp = express();

  constructor(
    private readonly bookRepository: BooksRepository,
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
      secret: "AUTH0_SECRET",
      baseURL: "http://localhost:3000",
      clientID: "jho4nyC2weC7ZwABTc7nqFe0SPkjz6zw",
      issuerBaseURL: "https://dev-7tlf1lodcp8t8adj.eu.auth0.com",
    };

    this.expressApp.use(auth(config));

    this.expressApp.get('/', function (req, res, next) {
      res.render('index', {
        title: 'Auth0 Webapp sample Nodejs',
        isAuthenticated: req.oidc.isAuthenticated()
      });
    });

    this.expressApp.get('/profile', requiresAuth(), (req, res) => {
      res.send(JSON.stringify(req.oidc.user, null, 2));
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
