import { Request, Response } from "express";
import { LoginUserUseCase } from "../../domain/user/features/login-user.use-case";
import { UserRepository } from "../../domain/user/interfaces/user.repository";
import { TokenService } from "../../domain/user/interfaces/token.service";

export class AuthController {
  private loginUserUseCase: LoginUserUseCase;

  constructor(
    private readonly userRepository: UserRepository,
    private readonly tokenService: TokenService
  ) {
    this.loginUserUseCase = new LoginUserUseCase(
      this.userRepository,
      this.tokenService
    );
  }

  public login = async (request: Request, response: Response) => {
    const { email, password } = request.body;

    if (!email || !password) {
      return response
        .status(400)
        .send({ error: "Email and password are required" });
    }

    try {
      const token = await this.loginUserUseCase.execute(email, password);
      return response.status(200).send({ token });
    } catch (error) {
      return response.status(401).send({ error: "Could not login" });
    }
  };
}
