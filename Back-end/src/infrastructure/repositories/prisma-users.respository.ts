// import { PrismaClient } from "@prisma/client";
// import bcrypt from "bcrypt";
// import { UserRepository } from "../../domain/user/interfaces/user.repository";
//
// const prisma = new PrismaClient();
//
// export class PrismaUserRepository implements UserRepository {
//
//   async comparePassword(plainText: string, hashed: string): Promise<boolean> {
//     return await bcrypt.compare(plainText, hashed);
//   }
// }
