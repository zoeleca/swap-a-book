import dotenv from 'dotenv';
import {InMemoryBooksRepository} from "./infrastructure/secondary/InMemoryBooksRepository";
import {UUIDGenerator} from "./domain/library/ports/UUIDGenerator";
import {Application} from "./infrastructure/primary/Application";
import {PrismaBooksRepository} from "./infrastructure/adapters/BookRepository";
dotenv.config();

const bookRepository = new PrismaBooksRepository();
const uuidGenerator = new UUIDGenerator();

const app = new Application(bookRepository, uuidGenerator);
app.start( Number(process.env.PORT));
