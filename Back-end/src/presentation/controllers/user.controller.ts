// src/presentation/controllers/user.controller.ts
import {Request, Response} from "express";
import {ensureUserExists} from "../../infrastructure/repositories/ensure-user-exists";

export class UserController {
  constructor() {
  }

  public getProfile = async (req: Request, res: Response) => {
    try {
      const auth0Id = req.auth?.payload?.sub;
      if (!auth0Id) return res.status(401).json({error: "Unauthorized"});

      const user = await ensureUserExists(auth0Id);
      if (!user) return res.status(404).json({error: "User not found"});

      return res.json({
        id: user.id,
        name: user.name,
        email: user.email,
        picture: user.picture,
      });
    } catch (error) {
      console.error("Failed to fetch user profile:", error);
      return res.status(500).json({error: "Internal server error"});
    }
  };

  public callBack = async (req: Request, res: Response) => {
    const {code, state} = req.query;

    if (!code) {
      return res.status(400).send("Authorization code not found in the query string");
    }

    try {
      // Exchange the authorization code for tokens
      const response = await fetch(`https://${process.env.AUTH0_DOMAIN}/oauth/token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          grant_type: 'authorization_code',
          client_id: process.env.AUTH0_CLIENT_ID!,
          client_secret: process.env.AUTH0_CLIENT_SECRET!,
          code: code as string,
          redirect_uri: `${process.env.FRONTEND_URL}/callback`, // Your frontend callback URL
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to exchange authorization code');
      }

      const data = await response.json();

      const {access_token, id_token, refresh_token} = data;

      // Optionally store the tokens in session or cookie (depending on your auth flow)
      res.cookie("access_token", access_token, {httpOnly: true, secure: process.env.NODE_ENV === 'production'});
      res.cookie("id_token", id_token, {httpOnly: true, secure: process.env.NODE_ENV === 'production'});

      // Redirect to profile page or another route
      res.redirect("/profile"); // Or wherever you want to send the user
    } catch (error) {
      console.error('Error exchanging authorization code:', error);
      res.status(500).send('Internal Server Error');
    }
  };
}
