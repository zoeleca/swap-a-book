import { v4 as uuidv4 } from "uuid"; // Using uuidv4 for generating unique IDs
import { BookModel } from "../../domain/library/models/book.model";
import { BooksRepository } from "../../domain/library/interfaces/books.repository";

export class InMemoryBooksRepository implements BooksRepository {
  public books = new Map<string, BookModel>();
  public users = new Map<string, { auth0Id: string; libraryId: string }>();
  public libraries = new Map<string, { id: string; name: string }>();

  async save(book: BookModel): Promise<void> {
    this.books.set(book.id, book);
  }

  async delete(book: BookModel): Promise<void> {
    this.books.delete(book.id);
  }

  async createFakeUserAndLibrary(auth0Id: string): Promise<{ libraryId: string }> {
    const libraryId = uuidv4();

    this.users.set(auth0Id, {auth0Id, libraryId});
    this.libraries.set(libraryId, {id: libraryId, name: "My Library"});

    return {libraryId};
  }

  async listLibraryBooks(libraryId: string): Promise<BookModel[]> {
    return Array.from(this.books.values()).filter((book) => book.libraryId === libraryId);
  }

  async listAllBooks(): Promise<BookModel[]> {
    return Array.from(this.books.values()).filter(
      (book) => book.status === "Visible"
    );
  }

  async searchBooks(query: string): Promise<BookModel[]> {
    const lowerQuery = query.toLowerCase();

    return Array.from(this.books.values()).filter((book) => {
      const titleMatch = book.title.toLowerCase().includes(lowerQuery);
      const authorsMatch = book.authors?.some(author =>
        author.toLowerCase().includes(lowerQuery)
      );
      return titleMatch || authorsMatch;
    });
  }


  async getById(id: string): Promise<BookModel | undefined> {
    return this.books.get(id);
  }
}