import dotenv from "dotenv";
import { Application } from "./presentation/application";
import { PrismaBooksRepository } from "./infrastructure/repositories/prisma-books.repository";
import { UuidGenerator } from "./domain/library/interfaces/uuid-generator";
import { PrismaUsersRepository } from "./infrastructure/repositories/prisma-users.respository";

dotenv.config();

const bookRepository = new PrismaBooksRepository();
const uuidGenerator = new UuidGenerator();
const usersRepository = new PrismaUsersRepository();

const app = new Application(bookRepository, usersRepository,uuidGenerator);
app.start(Number(process.env.PORT));
