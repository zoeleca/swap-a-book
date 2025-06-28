import { Request, Response } from "express";
import { AddBookUseCase } from "../../domain/library/features/add-book.use-case";
import { RemoveBookUseCase } from "../../domain/library/features/remove-book.use-case";
import { UuidGenerator } from "../../domain/library/interfaces/uuid-generator";
import { BookModel } from "../../domain/library/models/book.model";
import { PrismaBooksRepository } from "../../infrastructure/repositories/prisma-books.repository";
import { PrismaUsersRepository } from "../../infrastructure/repositories/prisma-users.respository";
import { BookLanguagesModel } from "../../domain/library/models/book-languages.model";
import { BookCategoriesModel } from "../../domain/library/models/book-categories.model";
import z from "zod";




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

      const user = await this.getLibraryId(req, res);

      const addBookSchema = z.object({
        title: z.string().min(1),
        authors: z.array(z.string().min(1)).nonempty(),
        categories: z.array(z.nativeEnum(BookCategoriesModel)).nonempty(),
        languages: z.array(z.nativeEnum(BookLanguagesModel)).nonempty(),
        coverImage: z.string().url().nullable().optional(),
        description: z.string().nullable().optional(),
      });

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

  public updateBook = async (req: Request, res: Response) => {
    try {
      const auth0Id: string = (req as any).auth?.payload?.sub;
      const name: string = (req as any).auth?.payload?.name;
      const bookId = req.params.id;
      const book = await this.bookRepository.getById(bookId);

      if (!book) return res.status(404).send({ error: "Book not found" });
      if (!auth0Id) {
        return res.status(401).send({ error: "Unauthorized: No Auth0 ID found" });
      }

      const user = await this.getLibraryId(req, res);

      if (book.libraryId !== user.library.id)
        return res.status(403).send({ error: "Forbidden: You do not own this book" });

      const updatedBook = await this.bookRepository.update(bookId, req.body);
      res.status(200).json(this.toResponse(updatedBook));
    } catch (err) {
      res.status(500).send({ error: "Failed to update book" });
    }
  };



  public getBookById = async (req: Request, res: Response) => {
    try {
      const bookId = req.params.id;
      const authPayload = (req as any).auth?.payload;
      const requesterAuth0Id = authPayload?.sub;

      const bookWithOwner = await this.bookRepository.getById(bookId);

      if (!bookWithOwner) {
        return res.status(404).send({ error: "BookModel not found" });
      }

      const response = this.toResponse(bookWithOwner, requesterAuth0Id);
      res.status(200).json(response);
    } catch (error) {
      res.status(500).send({ error: "Failed to retrieve book" });
    }
  };


  public searchBooks = async (req: Request, res: Response) => {
    try {
      const query = req.query.q as string;

      if (!query) {
        return res.status(400).send({ error: "Missing search query parameter `q`." });
      }

      const authPayload = (req as any).auth?.payload;
      const requesterAuth0Id = authPayload?.sub;

      const books = await this.bookRepository.searchBooks(query);

      res.status(200).json(books.map(book => this.toResponse(book, requesterAuth0Id)));
    } catch (error) {
      console.error("Search book error:", error);
      res.status(500).send({ error: "Failed to search books" });
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

  private async getLibraryId(req: Request, res: Response) {

    const auth0Id: string = (req as any).auth?.payload?.sub;
    const name: string = (req as any).auth?.payload?.name;

   return await this.userRepository.ensureUserWithLibrary(auth0Id, name);

  }

  private toResponse(
    book: BookModel & { library?: { user?: { name?: string, auth0Id?: string } } },
    requesterAuth0Id?: string
  ) {
    const ownerName = book.library?.user?.name;
    const ownerAuth0Id = book.library?.user?.auth0Id;

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
        ownerName,
        ownerAuth0Id,
        isOwnedByUser: requesterAuth0Id && requesterAuth0Id === ownerAuth0Id,
      },
    };
  }
}
