import {BooksRepository} from "../ports/BooksRepository";

export class RemoveBook {
    constructor(
        private readonly repository: BooksRepository
    ) {
    }

    async execute(bookId: string): Promise<void> {
        const book = await this.repository.findById(bookId);
        if (book) {
            await this.repository.delete(book)
        } else {
            throw new Error("Book not found");
        }
    }
}