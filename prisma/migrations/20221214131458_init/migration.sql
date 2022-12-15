-- CreateTable
CREATE TABLE "pegawai" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT,
    "address" TEXT,

    CONSTRAINT "pegawai_pkey" PRIMARY KEY ("id")
);
