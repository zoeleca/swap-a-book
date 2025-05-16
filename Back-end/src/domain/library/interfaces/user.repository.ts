import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class UsersRepository {
  async deleteUserByAuth0Id(auth0Id: string): Promise<void> {
    await prisma.user.delete({
      where: { auth0Id },
    });
  }
}
