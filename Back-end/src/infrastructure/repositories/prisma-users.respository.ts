import { PrismaClient } from "@prisma/client";
import { UsersRepository } from "../../domain/library/interfaces/user.repository";
import { randomUUID } from "node:crypto";
import { UserWithLibrary } from "../../domain/library/entity/user-with-library";

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
    const existing = await prisma.user.findUnique({
      where: { auth0Id },
      include: { library: true },
    });

    if (existing && existing.library) {
      return {
        id: existing.id,
        auth0Id: existing.auth0Id,
        libraryId: existing.library.id,
      };
    }

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

  async ensureUserWithLibrary(auth0Id: string): Promise<UserWithLibrary> {
    if (!auth0Id) throw new Error("Missing Auth0 ID");

    const user = await prisma.user.upsert({
      where: { auth0Id },
      update: {}, // nothing to update
      create: {
        id: randomUUID(),
        auth0Id,
        name: "",
        library: {
          create: {
            name: "My Library",
          },
        },
      },
      include: { library: true },
    });

    // Ensure library still exists
    if (!user.library) {
      const library = await prisma.library.create({
        data: {
          name: "My Library",
          user: { connect: { id: user.id } },
        },
      });

      return { ...user, library };
    }

    return {
      id: user.id,
      name: user.name,
      auth0Id: user.auth0Id,
      library: user.library,
    };;
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
