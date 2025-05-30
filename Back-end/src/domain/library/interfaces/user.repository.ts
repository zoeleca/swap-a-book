import { UserWithLibrary } from "../entity/user-with-library";

export interface UsersRepository {
  deleteUserByAuth0Id(auth0Id: string): Promise<void>;

  findUserByAuth0Id(auth0Id: string): Promise<{ libraryId: string } | null> ;

  ensureUserWithLibrary(auth0Id: string): Promise<UserWithLibrary>

  createUserWithLibrary(auth0Id: string): Promise<{ id: string; auth0Id: string; libraryId: string }>;
}
