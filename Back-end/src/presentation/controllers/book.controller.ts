import { Request, Response } from "express";
import { AddBookUseCase } from "../../domain/library/features/add-book.use-case";
import { RemoveBookUseCase } from "../../domain/library/features/remove-book.use-case";
import { UuidGenerator } from "../../domain/library/interfaces/uuid-generator";
import { BookModel } from "../../domain/library/models/book.model";
import { PrismaBooksRepository } from "../../infrastructure/repositories/prisma-books.repository";
import { PrismaUsersRepository } from "../../infrastructure/repositories/prisma-users.respository";
import { BookLanguagesModel } from "../../domain/library/models/book-languages.model";
import { BookCategoriesModel } from "../../domain/library/models/book-categories.model";
import { z } from "zod";

const addBookSchema = z.object({
  title: z.string().min(1),
  authors: z.array(z.string().min(1)).nonempty(),
  categories: z.array(z.nativeEnum(BookCategoriesModel)).nonempty(),
  languages: z.array(z.nativeEnum(BookLanguagesModel)).nonempty(),
  coverImage: z.string().url().nullable().optional(),
  description: z.string().nullable().optional(),
});


export class BookController {
  private addBookUseCase: AddBookUseCase;
  private removeBookUseCase: RemoveBookUseCase;

  constructor(
    private readonly bookRepository: PrismaBooksRepository,
    private readonly userRepository: PrismaUsersRepository,
    private readonly uuidGenerator: UuidGenerator
  ) {
    this.addBookUseCase = new AddBookUseCase(
      this.bookRepository,
      this.uuidGenerator
    );
    this.removeBookUseCase = new RemoveBookUseCase(this.bookRepository);
  }

  public addBook = async (req: Request, res: Response) => {
    try {
      const auth0Id: string = (req as any).auth?.payload?.sub;

      if (!auth0Id) {
        return res.status(401).send({ error: "Unauthorized: No Auth0 ID found" });
      }

      const user = await this.getLibraryId(auth0Id);

      const parseResult = addBookSchema.safeParse(req.body);
      if (!parseResult.success) {
        return res.status(400).json({
          error: "Invalid input",
          details: parseResult.error.flatten(),
        });
      }
      const { title, authors, categories, languages, coverImage, description } = parseResult.data;

      const addedBook = await this.addBookUseCase.execute({
        libraryId: user.library.id,
        title,
        authors,
        categories,
        languages,
        coverImage: coverImage ?? undefined,
        description: description ?? undefined,
      });


      res.status(201).json(this.toResponse(addedBook));
    } catch (error) {
      console.error("Add book error:", error);
      res.status(500).send({ error: "Failed to add book" });
    }
  };


  public getBookById = async (req: Request, res: Response) => {
    try {
      const bookId = req.params.id;
      const book = await this.bookRepository.getById(bookId);

      if (!book) {
        return res.status(404).send({error: "BookModel not found"});
      }

      res.status(200).json(this.toResponse(book));
    } catch (error) {
      res.status(500).send({error: "Failed to retrieve book"});
    }
  };

  public searchBooks = async (req: Request, res: Response) => {
    try {
      const query = req.query.q as string;

      if (!query) {
        return res.status(400).send({error: "Missing search query parameter `q`."});
      }

      const books = await this.bookRepository.searchBooks(query);

      res.status(200).json(books.map(this.toResponse));
    } catch (error) {
      console.error("Search book error:", error);
      res.status(500).send({error: "Failed to search books"});
    }
  };

  public removeBook = async (req: Request, res: Response) => {
    try {
      const bookId = req.params.id;
      await this.removeBookUseCase.execute(bookId);

      res.status(204).send(); // No content
    } catch (error) {
      res.status(500).send({error: "Failed to remove book"});
    }
  };

  private async getLibraryId(auth0Id: string) {
    let userData = await this.userRepository.ensureUserWithLibrary(auth0Id);

    return userData;
  }

  private toResponse(book: BookModel) {
    return {
      book: {
        id: book.id,
        title: book.title,
        authors: book.authors,
        categories: book.categories,
        borrowStatus: book.borrowStatus,
        status: book.status,
        languages: book.languages,
        coverImage: book.coverImage,
        description: book.description,
      },
    };
  }
}
