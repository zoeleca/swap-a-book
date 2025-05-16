import {fetchBooksFromApi} from "../../infrastructure/api/PublicBooksApi";
import {BookRepository} from "../../domain/repositories/BookRepository";
import {Book} from "../../domain/models/Book";

export class BookService implements BookRepository {
  async getBooks(): Promise<Book[]> {
    try {
      const books = await fetchBooksFromApi();
      return books;
    } catch (error) {
      throw new Error("Failed to fetch books");
    }
  }

  async getBookById(id: string): Promise<Book | null> {
    try {
      const books = await fetchBooksFromApi();
      return books.find(book => book.id === id) || null;
    } catch (error) {
      throw new Error("Failed to fetch book by ID");
    }
  }

}
