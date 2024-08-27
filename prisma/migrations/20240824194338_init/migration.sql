-- CreateTable
CREATE TABLE "ImageSchema" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "transformationType" TEXT NOT NULL,
    "publicId" TEXT NOT NULL,
    "secureUrl" TEXT NOT NULL,
    "width" INTEGER,
    "height" INTEGER,
    "transformationUrl" TEXT,
    "aspectRatio" TEXT,
    "color" TEXT,
    "prompt" TEXT,
    "authorId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ImageSchema_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "clerkId" INTEGER NOT NULL,
    "email" TEXT NOT NULL,
    "usernamd" TEXT NOT NULL,
    "firstName" TEXT,
    "lastName" TEXT,
    "photo" TEXT,
    "planId" INTEGER DEFAULT 1,
    "creditBalance" INTEGER DEFAULT 10,

    CONSTRAINT "User_pkey" PRIMARY KEY ("clerkId")
);

-- CreateTable
CREATE TABLE "Transaction" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "stripeId" INTEGER NOT NULL,
    "amount" INTEGER NOT NULL,
    "plan" TEXT NOT NULL,
    "credits" INTEGER NOT NULL,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_usernamd_key" ON "User"("usernamd");

-- CreateIndex
CREATE UNIQUE INDEX "Transaction_stripeId_key" ON "Transaction"("stripeId");

-- AddForeignKey
ALTER TABLE "ImageSchema" ADD CONSTRAINT "ImageSchema_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("clerkId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_stripeId_fkey" FOREIGN KEY ("stripeId") REFERENCES "User"("clerkId") ON DELETE RESTRICT ON UPDATE CASCADE;
