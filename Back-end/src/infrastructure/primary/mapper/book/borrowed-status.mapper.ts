import {BorrowStatus} from "../../../../domain/library/model/BorrowStatus";

export function fromDomainToBorrowedStatus(borrowStatus: BorrowStatus): string {
  return borrowStatus === BorrowStatus.Available ? "Available" : "Borrowed";
}