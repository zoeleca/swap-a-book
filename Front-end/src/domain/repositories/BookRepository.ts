import {Book} from "../models/Book.ts";

export interface BookRepository {
  getBooks(): Promise<Book[]>;

  getBookById(id: string): Promise<Book | null>;
}
