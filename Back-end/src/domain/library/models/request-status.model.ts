export class RequestStatusModel {
  static readonly PENDING = new RequestStatusModel("PENDING");
  static readonly ACCEPTED = new RequestStatusModel("ACCEPTED");
  static readonly REJECTED = new RequestStatusModel("REJECTED");

  private constructor(private readonly value: "PENDING" | "ACCEPTED" | "REJECTED") {}

  static from(value: string): RequestStatusModel {
    switch (value) {
      case "PENDING":
        return RequestStatusModel.PENDING;
      case "ACCEPTED":
        return RequestStatusModel.ACCEPTED;
      case "REJECTED":
        return RequestStatusModel.REJECTED;
      default:
        throw new Error(`Unknown RequestStatus value: ${value}`);
    }
  }

  toString(): string {
    return this.value;
  }
}
