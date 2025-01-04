import { BooksRepository } from "../interfaces/books.repository";

export class RemoveBookUseCase {
  constructor(private readonly repository: BooksRepository) {}

  async execute(bookId: string): Promise<void> {
    const book = await this.repository.getById(bookId);
    if (book) {
      await this.repository.delete(book);
    } else {
      throw new Error("BookModel not found");
    }
  }
}
