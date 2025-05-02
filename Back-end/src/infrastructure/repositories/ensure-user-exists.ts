import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();

export async function ensureUserExists(auth0Id: string) {
  if (!auth0Id) throw new Error("Missing Auth0 ID");

  let user = await prisma.user.findUnique({
    where: {auth0Id},
    include: {library: true},
  });

  if (!user) {
    user = await prisma.user.create({
      data: {
        auth0Id,
        name: '',
        library: {
          create: {
            name: "My Library",
          },
        },
      },
      include: {library: true},
    });
  }

  if (!user.library) {
    throw new Error("Library creation failed");
  }

  const userWithLibrary = user.library as {
    id: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    userId: string;
  };

  return {...user, library: userWithLibrary};
}
