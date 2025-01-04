import { BookCategory, BorrowStatus, PrismaClient } from "@prisma/client";
import { randomUUID } from "node:crypto";

const prisma = new PrismaClient();
const userId = randomUUID();
const libraryId = randomUUID();

async function main() {
  const user = await prisma.user.create({
    data: {
      email: `test-example@email.com`,
      name: "John Doe Lee",
      library: {
        create: {
          name: "John's LibraryModel",
          books: {
            create: [
              {
                title: "The Hobbit",
                authors: ["J.R.R. Tolkien"],
                categories: [BookCategory.Fantasy, BookCategory.Adventure],
                borrowStatus: BorrowStatus.Available,
              },
              {
                title: "1984",
                authors: ["George Orwell"],
                categories: [BookCategory.Fiction],
                borrowStatus: BorrowStatus.Available,
              },
              {
                title: `Harry Potter and the Philosopher's Stone`,
                authors: ["J.K. Rowling"],
                categories: [BookCategory.Fantasy, BookCategory.Mystery],
                borrowStatus: BorrowStatus.Available,
              },
            ],
          },
        },
      },
    },
  });
  console.log({ user });

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
      name: "Test LibraryModel",
      userId,
    },
  });

  const book1 = await prisma.book.create({
    data: {
      title: "The Hobbit",
      authors: ["J.R.R. Tolkien"],
      categories: [BookCategory.Fantasy, BookCategory.Adventure],
      borrowStatus: BorrowStatus.Available,
      libraryId,
    },
  });

  const book2 = await prisma.book.create({
    data: {
      title: "1984",
      authors: ["George Orwell"],
      categories: [BookCategory.Fiction],
      borrowStatus: BorrowStatus.Available,
      libraryId,
    },
  });

  await prisma.book.create({
    data: {
      title: `Harry Potter and the Philosopher's Stone`,
      authors: ["J.K. Rowling"],
      categories: [BookCategory.Fantasy, BookCategory.Mystery],
      borrowStatus: BorrowStatus.Available,
      libraryId,
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
