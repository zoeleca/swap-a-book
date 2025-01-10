import { randomUUID } from "node:crypto";
import { UuidGenerator } from "../../domain/library/interfaces/uuid-generator";

export class FakeUuidGenerator implements UuidGenerator {
  generate(): string {
    return randomUUID();
  }
}
