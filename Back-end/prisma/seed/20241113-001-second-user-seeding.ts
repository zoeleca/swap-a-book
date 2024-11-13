import {BookCategory, BorrowStatus, PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const user2 = await prisma.user.create({
    data: {
      email: `adalovelace@email.com`,
      name: 'Ada Lovelace Doe',
      library: {
        create: {
          name: "Ada's Library",
          books: {
            create: [
              {
                title: 'The Cat and the City',
                authors: ['Nick Bradley'],
                categories: [BookCategory.FICTION, BookCategory.ADVENTURE],
                borrowStatus: BorrowStatus.AVAILABLE
              },
              {
                title: 'The Joy of Small Things',
                authors: ['Hannah Jane Parkinson'],
                categories: [BookCategory.FICTION, BookCategory.CHILDREN_STORY],
                borrowStatus: BorrowStatus.BORROWED
              },
              {
                title: `Lessons in Chemistry`,
                authors: ['Bonnie Garmus'],
                categories: [BookCategory.NOVEL, BookCategory.MYSTERY, BookCategory.FICTION],
                borrowStatus: BorrowStatus.AVAILABLE
              },
            ],
          },
        },
      },
    },
  });
  console.log({user2});
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });