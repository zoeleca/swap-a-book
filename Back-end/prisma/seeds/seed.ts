import { BookCategory, BookLanguage, BookStatus, BorrowStatus, PrismaClient, } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {

  if (process.env.NODE_ENV === "production") {
    console.log("⛔ Skipping seed in production.");
    process.exit(0);
  }

  const user = await prisma.user.upsert({
    where: { auth0Id: "auth0|johny" },
    update: {},
    create: {
      name: "John Doe",
      auth0Id: "auth0|johny",
    },
  });


  console.log("Created user: ", user);

  const library = await prisma.library.create({
    data: {
      name: "John Doe's Library",
      userId: user.id,
    },
  });

  console.log("Created library: ", library);

  // Create some books in the library
  const books = await prisma.book.createMany({
    data: [
      {
        title: "The Great Adventure",
        authors: ["John Doe", "Jane Smith"],
        categories: [BookCategory.Fiction, BookCategory.Adventure],
        languages: [BookLanguage.English],
        borrowStatus: BorrowStatus.Available,
        status: BookStatus.Visible,
        libraryId: library.id,
      },
      {
        title: "The Mystery of the Hidden Valley",
        authors: ["Jane Smith"],
        categories: [BookCategory.Mystery],
        languages: [BookLanguage.English, BookLanguage.French],
        borrowStatus: BorrowStatus.Borrowed,
        status: BookStatus.Visible,
        libraryId: library.id,
      },
      {
        title: "Children of the Stars",
        authors: ["John Doe"],
        categories: [BookCategory.Fantasy, BookCategory.ChildrenStory],
        languages: [BookLanguage.English],
        borrowStatus: BorrowStatus.Available,
        status: BookStatus.Visible,
        libraryId: library.id,
      },
      {
        title: "Detective Stories",
        authors: ["Sherlock Holmes"],
        categories: [BookCategory.Detective, BookCategory.Mystery],
        languages: [BookLanguage.English],
        borrowStatus: BorrowStatus.Available,
        status: BookStatus.Hidden,
        libraryId: library.id,
      },
    ],
  });

  console.log("Created books: ", books);
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
