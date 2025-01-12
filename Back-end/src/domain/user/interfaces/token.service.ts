export interface TokenService {
  generateToken(payload: Record<string, any>): string;
}
