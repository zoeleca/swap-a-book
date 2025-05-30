export type UserWithLibrary = {
  id: string;
  name: string;
  auth0Id: string;
  library: {
    id: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    userId: string;
  };
};
