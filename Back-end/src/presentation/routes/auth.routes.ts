import {Router} from "express";
import {auth} from "express-oauth2-jwt-bearer";
import {AuthController} from "../controllers/auth.controller";

export class AuthRoutes {
  private router = Router();
  private controller = new AuthController();

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

    this.router.get("/callback", jwtCheck, this.controller.callBack);


  }
}
