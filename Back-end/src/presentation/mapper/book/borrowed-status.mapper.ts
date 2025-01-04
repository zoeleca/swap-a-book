import { BorrowStatus } from "../../../domain/library/models/BorrowStatus";

export function fromDomainToBorrowedStatus(borrowStatus: BorrowStatus): string {
  return borrowStatus === BorrowStatus.Available ? "Available" : "Borrowed";
}
