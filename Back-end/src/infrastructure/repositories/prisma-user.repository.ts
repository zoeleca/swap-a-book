import { PrismaClient } from "@prisma/client";
import { UserRepository } from "../../domain/library/interfaces/user.repository";

export class PrismaUserRepository implements UserRepository {
  private prisma = new PrismaClient();

  async getUserProfile(userId: string): Promise<any | undefined> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });
    return user || undefined;
  }

  async saveUserProfile(userId: string, profile: any): Promise<void> {
    await this.prisma.user.upsert({
      where: { id: userId },
      update: profile,
      create: { id: userId, ...profile },
    });
  }
}
