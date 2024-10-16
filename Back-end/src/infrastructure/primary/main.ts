import dotenv from 'dotenv';
import {InMemoryBooksRepository} from "../secondary/InMemoryBooksRepository";
import {UUIDGenerator} from "../../domain/library/ports/UUIDGenerator";
import {Application} from "./Application";
dotenv.config();

const bookRepository = new InMemoryBooksRepository();
const uuidGenerator = new UUIDGenerator();

const app = new Application(bookRepository, uuidGenerator);
app.start( Number(process.env.PORT));