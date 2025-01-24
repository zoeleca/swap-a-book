import dotenv from "dotenv";
import { Application } from "./presentation/application";
import { PrismaBooksRepository } from "./infrastructure/repositories/prisma-books.repository";
import { UuidGenerator } from "./domain/library/interfaces/uuid-generator";
import { PrismaUserRepository } from "./infrastructure/repositories/prisma-user.repository";

dotenv.config();

const bookRepository = new PrismaBooksRepository();
const uuidGenerator = new UuidGenerator();
const userRepository = new PrismaUserRepository();

const app = new Application(bookRepository, uuidGenerator, userRepository);
app.start(Number(process.env.PORT));
