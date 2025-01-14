import { Request, Response } from "express";
import { UserRepository } from "../../domain/library/interfaces/user.repository";

export class AuthenticationController {
  constructor(private readonly userRepository: UserRepository) {}

  public isAuthenticated = (req: Request, res: Response): void => {
    try {
      const isAuthenticated = req.oidc.isAuthenticated();
      res.status(200).json({ isAuthenticated });
    } catch (error) {
      console.error("Error checking authentication:", error);
      res.status(500).json({ error: "Failed to check authentication" });
    }
  };

  public getProfile = async (req: Request, res: Response): Promise<void> => {
    try {
      if (!req.oidc.isAuthenticated()) {
        res.status(401).json({ error: "User is not authenticated" });
        return;
      }

      res.send(JSON.stringify(req.oidc.user));
    } catch (error) {
      console.error("Error retrieving user profile:", error);
      res.status(500).json({ error: "Failed to retrieve user profile" });
    }
  };

  public login = (req: Request, res: Response): void => {
    try {
      res.oidc.login({
        returnTo: "/",
      });
    } catch (error) {
      console.error("Error during login:", error);
      res.status(500).json({ error: "Failed to initiate login process" });
    }
  };

  public logout = (req: Request, res: Response): void => {
    try {
      res.oidc.logout();
    } catch (error) {
      console.error("Error during logout:", error);
      res.status(500).json({ error: "Failed to log out" });
    }
  };
}
