-- CreateEnum
CREATE TYPE "UserOneTimePasswordType" AS ENUM ('SIGNUP', 'LOGIN', 'PASSWORD_RESET');

-- CreateTable
CREATE TABLE "UserOneTimePassword" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "type" "UserOneTimePasswordType" NOT NULL,
    "identifier" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserOneTimePassword_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "UserOneTimePassword_userId_idx" ON "UserOneTimePassword"("userId");

-- AddForeignKey
ALTER TABLE "UserOneTimePassword" ADD CONSTRAINT "UserOneTimePassword_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
