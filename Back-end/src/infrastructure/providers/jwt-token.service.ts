import { TokenService } from "../../domain/user/interfaces/token.service";

import jwt from "jsonwebtoken";

export class JwtTokenService implements TokenService {
  constructor(private readonly secret: string) {}

  generateToken(payload: Record<string, any>): string {
    return jwt.sign(payload, this.secret, { expiresIn: "1h" });
  }
}
