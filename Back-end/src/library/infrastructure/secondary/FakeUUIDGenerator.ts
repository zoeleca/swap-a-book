import { UUIDGenerator } from "../../domain/ports/UUIDGenerator";
import {randomUUID} from "node:crypto";

export class FakeUUIDGenerator implements UUIDGenerator {
  generate(): string {
    return randomUUID();
  }
}
// const bookuuid : FakeUUIDGenerator = "978a28c3-bafe-4569-acae-4932eeab580e";