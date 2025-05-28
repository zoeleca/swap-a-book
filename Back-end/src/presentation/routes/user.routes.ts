import { RequestHandler, Router } from "express";
import { UserController } from "../controllers/user.controller";
import { PrismaUsersRepository } from "../../infrastructure/repositories/prisma-users.respository";

export class UserRoutes {
  private router: Router;
  private controller: UserController;

  constructor(  private readonly userRepository: PrismaUsersRepository,
                private readonly jwtCheck: RequestHandler) {
    this.router = Router();
    this.controller = new UserController(this.userRepository);
    this.initializeRoutes();
  }

  public getRouter(): Router {
    return this.router;
  }

  private initializeRoutes() {

    this.router.get("/profile", this.jwtCheck, this.controller.getProfile);
    this.router.delete("/", this.jwtCheck, this.controller.deleteUser);

  }
}
