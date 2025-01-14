import { Router } from "express";
import { AuthenticationController } from "../controllers/authentication.controller";
import { UserRepository } from "../../domain/library/interfaces/user.repository";

export class AuthenticationRoutes {
  private router: Router;
  private authController: AuthenticationController;

  constructor(private readonly userRepository: UserRepository) {
    this.router = Router();
    this.authController = new AuthenticationController(this.userRepository);
    this.initializeRoutes();
  }

  public getRouter(): Router {
    return this.router;
  }

  private initializeRoutes() {
    this.router.get("/status", this.authController.isAuthenticated);
    this.router.get("/profile", this.authController.getProfile);
    this.router.get("/logout", this.authController.logout);
    this.router.get("/login", this.authController.login);
  }
}
