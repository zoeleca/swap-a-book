import { UserRepository } from "../../domain/library/interfaces/user.repository";

export class InMemoryUserRepository implements UserRepository {
  private users = new Map<string, any>();

  async getUserProfile(userId: string): Promise<any | undefined> {
    return this.users.get(userId);
  }

  async saveUserProfile(userId: string, profile: any): Promise<void> {
    this.users.set(userId, profile);
  }
}
