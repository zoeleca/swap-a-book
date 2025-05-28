import { v4 as uuidv4 } from "uuid";
import { UsersRepository } from "../../domain/library/interfaces/user.repository";

export class InMemoryUsersRepository implements UsersRepository {
  private users = new Map<string, { id: string; auth0Id: string; libraryId: string }>();
  private libraries = new Map<string, { id: string; name: string }>();

  async deleteUserByAuth0Id(auth0Id: string): Promise<void> {
    const user = Array.from(this.users.values()).find(u => u.auth0Id === auth0Id);
    if (user) {
      this.users.delete(user.id);
      this.libraries.delete(user.libraryId);
    }
  }

  async findUserByAuth0Id(auth0Id: string): Promise<{ libraryId: string } | null> {
    const user = Array.from(this.users.values()).find(u => u.auth0Id === auth0Id);
    if (!user) return null;
    return { libraryId: user.libraryId };
  }

  async createUserWithLibrary(auth0Id: string): Promise<{ id: string; auth0Id: string; libraryId: string }> {
    const id = uuidv4();
    const libraryId = uuidv4();

    this.libraries.set(libraryId, { id: libraryId, name: "InMemory Library" });
    const newUser = { id, auth0Id, libraryId };
    this.users.set(id, newUser);

    return newUser;
  }
}