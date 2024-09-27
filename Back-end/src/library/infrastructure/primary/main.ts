import { Application } from "./Application";
import { InMemoryBooksRepository } from "../secondary/InMemoryBooksRepository";
import { UUIDGenerator } from "../../domain/ports/UUIDGenerator";
import dotenv from 'dotenv';
dotenv.config();

const bookRepository = new InMemoryBooksRepository();
const uuidGenerator = new UUIDGenerator();

const app = new Application(bookRepository, uuidGenerator);
app.start( Number(process.env.PORT));