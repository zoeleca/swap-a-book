import dotenv from "dotenv";
import { Application } from "./presentation/application";
import { PrismaBooksRepository } from "./infrastructure/repositories/prisma-books.repository";
import { UuidGenerator } from "./domain/library/interfaces/uuid-generator";

dotenv.config();

const bookRepository = new PrismaBooksRepository();
const uuidGenerator = new UuidGenerator();

const app = new Application(bookRepository, uuidGenerator);
app.start(Number(process.env.PORT));
