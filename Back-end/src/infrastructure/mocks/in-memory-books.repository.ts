import {BookModel} from "../../domain/library/models/book.model";
import {BooksRepository} from "../../domain/library/interfaces/books.repository";

export class InMemoryBooksRepository implements BooksRepository {
  public books = new Map<string, BookModel>();

  public users = new Map<string, { auth0Id: string; libraryId: string }>();

  async save(book: BookModel): Promise<void> {
    this.books.set(book.id, book);
  }

  async delete(book: BookModel): Promise<void> {
    this.books.delete(book.id);
  }

  async findUserByAuth0Id(auth0Id: string): Promise<{ libraryId: string } | null> {
    for (const user of this.users.values()) {
      if (user.auth0Id === auth0Id) {
        return {libraryId: user.libraryId};
      }
    }
    return null;
  }


  async getById(id: string): Promise<BookModel | undefined> {
    return this.books.get(id);
  }

  async listLibraryBooks(libraryId: string): Promise<BookModel[]> {
    return Array.from(this.books.values()).filter(
      (book) => book.libraryId === libraryId
    );
  }

  async listAllBooks(): Promise<BookModel[]> {
    return Array.from(this.books.values()).filter(
      (book) => book.status === "Visible"
    );
  }
}
