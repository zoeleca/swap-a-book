import {Request, Response} from "express";

export class AuthController {
  constructor() {
  }

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
