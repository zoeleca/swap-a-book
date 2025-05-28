import { PrismaClient } from "@prisma/client";
import { UsersRepository } from "../../domain/library/interfaces/user.repository";
import { randomUUID } from "node:crypto";

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

  async createUserWithLibrary(auth0Id: string): Promise<{ id: string; auth0Id: string; libraryId: string }> {
    const user = await prisma.user.create({
      data: {
        id: randomUUID(),
        name: 'New User',
        auth0Id,
        library: {
          create: {
            name: 'Default Library',
          },
        },
      },
      include: {
        library: true,
      },
    });

    return {
      id: user.id,
      auth0Id: user.auth0Id,
      libraryId: user.library!.id,
    };
  }


  async findUserByAuth0Id(auth0Id: string): Promise<{ libraryId: string } | null> {
    const user = await prisma.user.findUnique({
      where: {auth0Id},
      include: {library: true},
    });

    if (!user || !user.library) return null;

    return {libraryId: user.library.id};
  }

}
