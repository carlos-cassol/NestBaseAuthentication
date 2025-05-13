-- CreateTable
CREATE TABLE "User" (
    "Id" TEXT NOT NULL,
    "Name" TEXT NOT NULL,
    "Email" TEXT NOT NULL,
    "Password" TEXT NOT NULL,
    "CreatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "CreatedBy" TEXT NOT NULL,
    "IsDeleted" BOOLEAN NOT NULL DEFAULT false,
    "DeletedAt" TIMESTAMP(3),
    "DeletedBy" TEXT,
    "UpdatedAt" TIMESTAMP(3),
    "UpdatedBy" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("Id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_Email_key" ON "User"("Email");
