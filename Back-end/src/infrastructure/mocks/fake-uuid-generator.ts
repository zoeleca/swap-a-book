import { randomUUID } from "node:crypto";
import { UUIDGenerator } from "../../domain/library/ports/UuidGenerator";

export class FakeUuidGenerator implements UUIDGenerator {
  generate(): string {
    return randomUUID();
  }
}
