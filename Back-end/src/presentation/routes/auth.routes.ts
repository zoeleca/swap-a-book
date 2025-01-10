import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";
import { TokenService } from "../../domain/user/interfaces/token.service";

import { UserRepository } from "../../domain/user/interfaces/user.repository";

export class AuthRoutes {
  private router: Router;
  private authController: AuthController;

  constructor(
    private readonly userRepository: UserRepository,
    private readonly tokenService: TokenService
  ) {
    this.router = Router();
    this.authController = new AuthController(
      this.userRepository,
      this.tokenService
    );
    this.initializeRoutes();
  }

  public getRouter(): Router {
    return this.router;
  }

  private initializeRoutes() {
    this.router.post("/login", this.authController.login);
  }
}
