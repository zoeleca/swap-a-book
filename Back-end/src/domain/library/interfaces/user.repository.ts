export interface UserRepository {
  getUserProfile(userId: string): Promise<any | undefined>;

  saveUserProfile(userId: string, profile: any): Promise<void>;
}
