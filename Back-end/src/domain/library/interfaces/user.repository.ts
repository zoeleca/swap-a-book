export interface UsersRepository {
  deleteUserByAuth0Id(auth0Id: string): Promise<void>;

  findUserByAuth0Id(auth0Id: string): Promise<{ id: string; auth0Id: string; libraryId: string | null } | null>;

  createUserWithLibrary(auth0Id: string): Promise<{ id: string; auth0Id: string; libraryId: string }>;
}
