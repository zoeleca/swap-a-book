import {randomUUID} from "node:crypto";
import {UUIDGenerator} from "../../domain/library/ports/UUIDGenerator";

export class FakeUUIDGenerator implements UUIDGenerator {
  generate(): string {
    return randomUUID();
  }
}