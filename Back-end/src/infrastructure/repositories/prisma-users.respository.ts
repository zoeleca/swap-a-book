import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { UserRepository } from "../../domain/user/interfaces/user.repository";

const prisma = new PrismaClient();

export class PrismaUserRepository implements UserRepository {
  async findByEmail(email: string): Promise<void> {
    await prisma.user.findUnique({
      where: { email },
    });
  }

  async comparePassword(plainText: string, hashed: string): Promise<boolean> {
    return await bcrypt.compare(plainText, hashed);
  }
}
