import { v4 as uuidv4 } from "uuid";
import { UsersRepository } from "../../domain/library/interfaces/user.repository";
import { UserWithLibrary } from "../../domain/library/entity/user-with-library";

export class InMemoryUsersRepository implements UsersRepository {
  private users = new Map<string, { id: string; auth0Id: string; libraryId: string }>();
  private libraries = new Map<string, { id: string; name: string }>();

  async deleteUserByAuth0Id(auth0Id: string): Promise<void> {
    const user = Array.from(this.users.values()).find(user => user.auth0Id === auth0Id);
    if (user) {
      this.users.delete(user.id);
      this.libraries.delete(user.libraryId);
    }
  }

  async ensureUserWithLibrary(auth0Id: string): Promise<UserWithLibrary> {
    let existing = Array.from(this.users.values()).find(user => user.auth0Id === auth0Id);

    if (!existing) {
      existing = await this.createUserWithLibrary(auth0Id);
    }

    return {
      id: existing.id,
      name: "InMemory User",
      auth0Id: existing.auth0Id,
      library: {
        id: existing.libraryId,
        name: this.libraries.get(existing.libraryId)?.name || "InMemory Library",
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: existing.id,
      },
    };
  }

  async findUserByAuth0Id(auth0Id: string): Promise<{ libraryId: string } | null> {
    const user = Array.from(this.users.values()).find(user => user.auth0Id === auth0Id);
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