export interface UserRepository {
  findByEmail(email: string): Promise<void>;

  comparePassword(plainText: string, hashed: string): Promise<boolean>;
}
