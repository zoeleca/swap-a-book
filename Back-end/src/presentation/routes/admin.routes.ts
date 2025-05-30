import { Request, Response, Router } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = Router();

// Middleware simple pour sécuriser l'accès (optionnel)
function requireSecretKey(req: Request, res: Response, next: Function) {
  const auth = req.headers.authorization;
  if (auth !== `Bearer ${process.env.ADMIN_SECRET_KEY}`) {
    return res.status(403).json({ error: "Access denied" });
  }
  next();
}

router.post("/clean-seed", requireSecretKey, async (req: Request, res: Response) => {
  try {
    const user = await prisma.user.findUnique({
      where: { auth0Id: "auth0|johny" },
    });

    if (!user) {
      return res.status(200).json({ message: "Aucun utilisateur à supprimer." });
    }

    const booksDeleted = await prisma.book.deleteMany({
      where: {
        library: {
          userId: user.id,
        },
      },
    });

    const libraryDeleted = await prisma.library.deleteMany({
      where: {
        userId: user.id,
      },
    });

    const userDeleted = await prisma.user.delete({
      where: {
        id: user.id,
      },
    });

    res.status(200).json({
      message: "Nettoyage terminé",
      deleted: {
        books: booksDeleted.count,
        library: libraryDeleted.count,
        user: userDeleted,
      },
    });
  } catch (error) {
    console.error("Erreur lors du nettoyage :", error);
    res.status(500).json({ error: "Erreur serveur" });
  } finally {
    await prisma.$disconnect();
  }
});

export default router;
