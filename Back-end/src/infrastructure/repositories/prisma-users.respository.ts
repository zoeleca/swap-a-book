import { PrismaClient } from "@prisma/client";
import { UsersRepository } from "../../domain/library/interfaces/user.repository";

const prisma = new PrismaClient();

export class PrismaUsersRepository implements UsersRepository {

  async deleteUserByAuth0Id(auth0Id: string): Promise<void> {
    const user = await prisma.user.findUnique({
      where: { auth0Id },
      include: { library: { include: { books: true } } },
    });
    if (!user) throw new Error("User not found");
    if (user.library?.books.length) {
      await prisma.book.deleteMany({
        where: { libraryId: user.library.id },
      });
    }
    if (user.library) {
      await prisma.library.delete({
        where: { id: user.library.id },
      });
    }
    await prisma.user.delete({
      where: { auth0Id },
    });
  }

}
