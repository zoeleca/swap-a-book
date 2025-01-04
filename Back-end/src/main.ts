import dotenv from "dotenv";
import { UUIDGenerator } from "./domain/library/ports/UUIDGenerator";
import { Application } from "./presentation/Application";
import { PrismaBooksRepository } from "./infrastructure/adapters/PrismaBooksRepository";

dotenv.config();

const bookRepository = new PrismaBooksRepository();
const uuidGenerator = new UUIDGenerator();

const app = new Application(bookRepository, uuidGenerator);
app.start(Number(process.env.PORT));
