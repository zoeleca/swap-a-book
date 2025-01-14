import supertest from "supertest";
import { beforeAll, describe, it } from "vitest";
import { Application } from "../../src/presentation/application";
import { FakeUuidGenerator } from "../../src/infrastructure/mocks/fake-uuid-generator";
import { InMemoryBooksRepository } from "../../src/infrastructure/mocks/in-memory-books.repository";
import { InMemoryUserRepository } from "../../src/infrastructure/mocks/InMemoryUserRepository";

describe("user", () => {
  const uuidGenerator = new FakeUuidGenerator();
  const booksRepository = new InMemoryBooksRepository();
  const userRepository = new InMemoryUserRepository();
  const app = new Application(booksRepository, uuidGenerator, userRepository);
  const supertestApp = supertest(app.expressApp);

  beforeAll(async () => {
    const login = await supertestApp
      .get("/login")
      .set("Accept", "application/json")
      .set("Content-Type", "application/json")
      .send({});
  });

  it("should authorize login with a authenticated user", async () => {});
  it("should refuse login with a non authenticated user", async () => {});
});
