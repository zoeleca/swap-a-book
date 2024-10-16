// import {BookCategory, PrismaClient} from "@prisma/client";
//
// const prisma = new PrismaClient();
//
// async function main() {
//   const user = await prisma.user.create({
//     data: {
//       email: `user@email.com`,
//       name: 'John Doe',
//       library: {
//         create: {
//           name: "John's Library",
//           books: {
//             create:[
//               {
//                 title: 'The Hobbit',
//                 authors: ['J.R.R. Tolkien'],
//                 categories: [BookCategory.FANTASY, BookCategory.ADVENTURE],
//                 borrowStatus: BorrowStatus.AVAILABLE
//               },
//               {
//                 title: '1984',
//                 authors: ['George Orwell'],
//                 categories: [BookCategory.FICTION],
//                 borrowStatus: BorrowStatus.AVAILABLE
//               },
//               {
//                 title: `Harry Potter and the Philosopher's Stone`,
//                 authors: ['J.K. Rowling'],
//                 categories: [BookCategory.FANTASY, BookCategory.MYSTERY],
//                 borrowStatus: BorrowStatus.AVAILABLE
//               },
//             ],
//           },
//         },
//       },
//     },
//   });
//   console.log({user});
// }
//
// main()
//   .catch((e)=>{
//     console.error(e);
//     process.exit(1);
//   })
//   .finally(async () => {
//     await prisma.$disconnect();
//   });