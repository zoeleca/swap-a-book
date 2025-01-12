import { UserRepository } from "../interfaces/user.repository";
import { TokenService } from "../interfaces/token.service";

export class LoginUserUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly tokenService: TokenService
  ) {}

  async execute(email: string, password: string): Promise<string> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new Error("Invalid email or password");
    }

    const isPasswordValid = await this.userRepository.comparePassword(
      password,
      user.password
    );

    if (!isPasswordValid) {
      throw new Error("Invalid email or password");
    }

    // Generate a JWT token
    return this.tokenService.generateToken({ id: user.id, email: user.email });
  }
}
