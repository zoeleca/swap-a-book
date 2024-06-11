import { Book } from "../model/Book";

export interface BooksRepository {
  save(book: Book): Promise<void>;
}
