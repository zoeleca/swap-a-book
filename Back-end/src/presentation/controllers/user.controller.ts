import { Request, Response } from "express";
import { PrismaUsersRepository } from "../../infrastructure/repositories/prisma-users.respository";

export class UserController {

  constructor( private readonly usersRepository : PrismaUsersRepository) {}

  public getProfile = async (req: Request, res: Response) => {
    try {
      console.log("Decoded JWT:", req.auth); // Add this line to inspect the token
      const auth0Id = req.auth?.payload?.sub;
      if (!auth0Id) return res.status(401).json({ error: "Unauthorized" });

      const user = await this.usersRepository.ensureUserWithLibrary(auth0Id);
      if (!user) return res.status(404).json({ error: "User not found" });

      return res.json({
        id: user.id,
        name: user.name,
      });
    } catch (error) {
      console.error("Failed to fetch user profile:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  };

  public deleteUser = async (req: Request, res: Response) => {
    try {
      const auth0Id = req.auth?.payload?.sub;
      if (!auth0Id) return res.status(401).json({ error: "Unauthorized" });

      await this.usersRepository.deleteUserByAuth0Id(auth0Id);

      // Optionally: call Auth0 Management API here to delete Auth0 user account

      return res.status(204).send();
    } catch (error) {
      console.error("Failed to delete user:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  };
}
