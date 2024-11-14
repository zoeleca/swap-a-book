import {BookCategory, BorrowStatus, PrismaClient} from "@prisma/client";
import {randomUUID} from "node:crypto";

const prisma = new PrismaClient();
const userId = randomUUID();
const libraryId = randomUUID();

async function main() {
  const user = await prisma.user.create({
    data: {
      email: `example@email.com`,
      name: 'John Doe Lee',
      library: {
        create: {
          name: "John's Library",
          books: {
            create: [
              {
                title: 'The Hobbit',
                authors: ['J.R.R. Tolkien'],
                categories: [BookCategory.FANTASY, BookCategory.ADVENTURE],
                borrowStatus: BorrowStatus.AVAILABLE
              },
              {
                title: '1984',
                authors: ['George Orwell'],
                categories: [BookCategory.FICTION],
                borrowStatus: BorrowStatus.AVAILABLE
              },
              {
                title: `Harry Potter and the Philosopher's Stone`,
                authors: ['J.K. Rowling'],
                categories: [BookCategory.FANTASY, BookCategory.MYSTERY],
                borrowStatus: BorrowStatus.AVAILABLE
              },
            ],
          },
        },
      },
    },
  });
  console.log({user});

  const user2 = await prisma.user.create({
    data: {
      id: userId,
      email: `testuser-${userId}@example.com`,
      name: "Test User",
    },
  });

  const library = await prisma.library.create({
    data: {
      id: libraryId,
      name: "Test Library",
      userId,
    },
  });

  const book1 = await prisma.book.create({
    data:
      {
        title: 'The Hobbit',
        authors: ['J.R.R. Tolkien'],
        categories: [BookCategory.FANTASY, BookCategory.ADVENTURE],
        borrowStatus: BorrowStatus.AVAILABLE,
        libraryId
      }
  });

  const book2 = await prisma.book.create({
    data:
      {
        title: '1984',
        authors: ['George Orwell'],
        categories: [BookCategory.FICTION],
        borrowStatus: BorrowStatus.AVAILABLE,
        libraryId
      },
  });

  await prisma.book.create({
    data:
      {
        title: `Harry Potter and the Philosopher's Stone`,
        authors: ['J.K. Rowling'],
        categories: [BookCategory.FANTASY, BookCategory.MYSTERY],
        borrowStatus: BorrowStatus.AVAILABLE,
        libraryId
      },
  });

  console.log("\n\n", user2, "\n\n");
  console.log("\n\n", library, "\n\n");
  console.log("\n\n", book1, "\n\n");
  console.log("\n\n", book2, "\n\n");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });