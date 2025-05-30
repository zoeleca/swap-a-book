import { BookCategory, BookLanguage, BookStatus, BorrowStatus, PrismaClient, } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // 1. Upsert user
  const user = await prisma.user.upsert({
    where: { auth0Id: "auth0|johny" },
    update: {},
    create: {
      name: "John Doe",
      auth0Id: "auth0|johny",
    },
  });

  // 2. Upsert library (handle unique userId constraint)
  let library = await prisma.library.findUnique({
    where: { userId: user.id },
  });

  if (!library) {
    library = await prisma.library.create({
      data: {
        name: "John Doe's Library",
        userId: user.id,
      },
    });
  }

  console.log("Created user:", user);
  console.log("Using library:", library);

  // 3. Create books using create() (because of array fields)
  const books = await Promise.all([
    prisma.book.create({
      data: {
        title: "The Great Adventure",
        authors: ["John Doe", "Jane Smith"],
        categories: [BookCategory.Fiction, BookCategory.Adventure],
        languages: [BookLanguage.English],
        borrowStatus: BorrowStatus.Available,
        status: BookStatus.Visible,
        libraryId: library.id,
      },
    }),
    prisma.book.create({
      data: {
        title: "The Mystery of the Hidden Valley",
        authors: ["Jane Smith"],
        categories: [BookCategory.Mystery],
        languages: [BookLanguage.English, BookLanguage.French],
        borrowStatus: BorrowStatus.Borrowed,
        status: BookStatus.Visible,
        libraryId: library.id,
      },
    }),
    prisma.book.create({
      data: {
        title: "Children of the Stars",
        authors: ["John Doe"],
        categories: [BookCategory.Fantasy, BookCategory.ChildrenStory],
        languages: [BookLanguage.English],
        borrowStatus: BorrowStatus.Available,
        status: BookStatus.Visible,
        libraryId: library.id,
      },
    }),
    prisma.book.create({
      data: {
        title: "Detective Stories",
        authors: ["Sherlock Holmes"],
        categories: [BookCategory.Detective, BookCategory.Mystery],
        languages: [BookLanguage.English],
        borrowStatus: BorrowStatus.Available,
        status: BookStatus.Hidden,
        libraryId: library.id,
      },
    }),
  ]);

  console.log("Created books:", books);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
