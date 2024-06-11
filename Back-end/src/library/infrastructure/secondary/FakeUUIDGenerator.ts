import { UUIDGenerator } from "../../domain/ports/UUIDGenerator";

export class FakeUUIDGenerator implements UUIDGenerator {
  generate(): string {
    return "978a28c3-bafe-4569-acae-4932eeab580e";
  }
}
