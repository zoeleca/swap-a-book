-- CreateEnum
CREATE TYPE "BookCategory" AS ENUM ('Unknown', 'Fiction', 'Fantasy', 'ChildrenStory', 'Adventure', 'Novel', 'Mystery', 'Crime', 'Detective');

-- CreateEnum
CREATE TYPE "BookLanguage" AS ENUM ('English', 'Chinese', 'Hindi', 'Spanish', 'French', 'Arabic', 'Bengali', 'Portuguese', 'Russian', 'Urdu', 'Indonesian', 'German', 'Japanese', 'Swahili', 'Marathi', 'Telugu', 'Turkish', 'Korean', 'Tamil', 'Vietnamese');

-- CreateEnum
CREATE TYPE "BookStatus" AS ENUM ('Visible', 'Hidden', 'Removed');

-- CreateEnum
CREATE TYPE "BorrowStatus" AS ENUM ('Borrowed', 'Available');

-- CreateTable
CREATE TABLE "User" (
    "id" UUID NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "picture" TEXT,
    "auth0Id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Library" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "userId" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Library_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Book" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "authors" TEXT[],
    "categories" "BookCategory"[],
    "languages" "BookLanguage"[],
    "borrowStatus" "BorrowStatus" NOT NULL,
    "status" "BookStatus" NOT NULL,
    "libraryId" UUID NOT NULL,

    CONSTRAINT "Book_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_auth0Id_key" ON "User"("auth0Id");

-- CreateIndex
CREATE UNIQUE INDEX "Library_userId_key" ON "Library"("userId");

-- AddForeignKey
ALTER TABLE "Library" ADD CONSTRAINT "Library_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Book" ADD CONSTRAINT "Book_libraryId_fkey" FOREIGN KEY ("libraryId") REFERENCES "Library"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
