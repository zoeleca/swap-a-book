import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function cleanSeededData() {
  try {
    const user = await prisma.user.findUnique({
      where: { auth0Id: "auth0|johny" },
    });

    if (!user) {
      console.log("✅ Aucun utilisateur de seed trouvé. Rien à supprimer.");
      return;
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

    console.log("🗑️ Livres supprimés :", booksDeleted.count);
    console.log("🗑️ Bibliothèque supprimée :", libraryDeleted.count);
    console.log("🗑️ Utilisateur supprimé :", userDeleted);
  } catch (error) {
    console.error("❌ Erreur pendant la suppression :", error);
  } finally {
    await prisma.$disconnect();
  }
}

cleanSeededData();
