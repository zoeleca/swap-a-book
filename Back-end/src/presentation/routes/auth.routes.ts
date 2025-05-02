import {Router} from "express";
import {auth} from "express-oauth2-jwt-bearer";
import {UserController} from "../controllers/auth.controller";

export class UserRoutes {
  private router = Router();
  private controller = new UserController();

  constructor() {
    this.initializeRoutes();
  }

  public getRouter() {
    return this.router;
  }

  private initializeRoutes() {
    const jwtCheck = auth({
      audience: process.env.AUTH0_AUDIENCE!,
      issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL!,
      tokenSigningAlg: "RS256",
    });

    this.router.get("/profile", jwtCheck, this.controller.getProfile);
    this.router.get("/callback", jwtCheck, this.controller.callBack);


  }
}
