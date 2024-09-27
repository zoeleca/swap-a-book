import { UUIDGenerator } from "../../domain/ports/UUIDGenerator";
import {randomUUID} from "node:crypto";

export class FakeUUIDGenerator implements UUIDGenerator {
  generate(): string {
    return randomUUID();
  }
}