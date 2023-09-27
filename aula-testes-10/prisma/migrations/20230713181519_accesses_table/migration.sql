-- CreateTable
CREATE TABLE "accesses" (
    "id" SERIAL NOT NULL,
    "ip" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "token" TEXT NOT NULL,

    CONSTRAINT "accesses_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "accesses_token_key" ON "accesses"("token");
