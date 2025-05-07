// src/presentation/controllers/user.controller.ts
import {Request, Response} from "express";
import {ensureUserExists} from "../../infrastructure/repositories/ensure-user-exists";

export class UserController {
  constructor() {
  }

  public getProfile = async (req: Request, res: Response) => {
    try {
      console.log("Decoded JWT:", req.auth); // Add this line to inspect the token
      const auth0Id = req.auth?.payload?.sub;
      if (!auth0Id) return res.status(401).json({error: "Unauthorized"});

      const user = await ensureUserExists(auth0Id);
      if (!user) return res.status(404).json({error: "User not found"});

      return res.json({
        id: user.id,
        name: user.name,
      });
    } catch (error) {
      console.error("Failed to fetch user profile:", error);
      return res.status(500).json({error: "Internal server error"});
    }
  };

}
