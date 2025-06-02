import { RequestStatusModel } from "./request-status.model";

export class BorrowRequestModel {
  constructor(
    public readonly id: string,
    public readonly bookId: string,
    public readonly requesterId: string,
    public readonly status: RequestStatusModel,
    public readonly createdAt: Date
  ) {}
}
