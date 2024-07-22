import { Application } from "./Application";
import { InMemoryBooksRepository } from "../secondary/InMemoryBooksRepository";
import { UUIDGenerator } from "../../domain/ports/UUIDGenerator";


const bookRepository = new InMemoryBooksRepository();
const uuidGenerator = new UUIDGenerator();

const app = new Application(bookRepository, uuidGenerator);
app.start(3000);
