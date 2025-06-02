import { BooksRepository } from "../interfaces/books.repository";
import { UsersRepository } from "../interfaces/user.repository";
import { UuidGenerator } from "../interfaces/uuid-generator";
import { RequestStatusModel } from "../models/request-status.model";
import { BorrowRequestModel } from "../models/borrow-request.model";

export class CreateBorrowRequestUseCase {
  constructor(
    private readonly booksRepository: BooksRepository,
    private readonly usersRepository: UsersRepository,
    private readonly uuidGenerator: UuidGenerator
  ) {}

  async execute(bookId: string, requesterAuth0Id: string): Promise<BorrowRequestModel> {
    const user = await this.usersRepository.ensureUserWithLibrary(requesterAuth0Id);
    const book = await this.booksRepository.getById(bookId);

    if (!book) throw new Error("Book not found");
    if (book.borrowStatus.toString() !== "Available") throw new Error("Book not available");

    return this.booksRepository.createBorrowRequest({
      id: this.uuidGenerator.generate(),
      bookId: book.id,
      requesterId: user.id,
      status: RequestStatusModel.PENDING,
      createdAt: new Date(),
    });
  }
}
