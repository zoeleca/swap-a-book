import { Router } from "express";
import { auth } from "express-oauth2-jwt-bearer";
import { UserController } from "../controllers/user.controller";

export class UserRoutes {
  private router: Router;
  private controller: UserController;

  constructor() {
    this.router = Router();
    this.controller = new UserController();
    this.initializeRoutes();
  }

  public getRouter(): Router {
    return this.router;
  }

  private initializeRoutes() {
    const jwtCheck = auth({
      audience: "http://localhost:8000",
      issuerBaseURL: "https://dev-b77oxg884oraklfh.eu.auth0.com",
      tokenSigningAlg: "RS256",
    });


    this.router.get("/profile", jwtCheck, this.controller.getProfile);
    this.router.delete("/", jwtCheck, this.controller.deleteUser);

  }
}
