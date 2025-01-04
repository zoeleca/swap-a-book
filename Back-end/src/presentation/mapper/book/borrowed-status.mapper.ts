import { BorrowStatusModel } from "../../../domain/library/models/borrow-status.model";

export function fromDomainToBorrowedStatus(
  borrowStatus: BorrowStatusModel
): string {
  return borrowStatus === BorrowStatusModel.Available
    ? "Available"
    : "Borrowed";
}
