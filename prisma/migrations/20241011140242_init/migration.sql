-- CreateTable
CREATE TABLE "Jamaah" (
    "id" SERIAL NOT NULL,
    "namaLengkap" TEXT NOT NULL,
    "nik" TEXT NOT NULL,
    "tempatLahir" TEXT NOT NULL,
    "tanggalLahir" TIMESTAMP(3) NOT NULL,
    "alamat" TEXT NOT NULL,
    "provinsi" TEXT NOT NULL,
    "kabKota" TEXT NOT NULL,
    "kecamatan" TEXT NOT NULL,
    "kelurahan" TEXT NOT NULL,
    "jenisKelamin" TEXT NOT NULL,
    "noPaspor" TEXT NOT NULL,
    "masaBerlakuPaspor" TIMESTAMP(3) NOT NULL,
    "noVisa" TEXT,
    "berlakuVisa" TIMESTAMP(3),
    "paketDipilih" TEXT NOT NULL,
    "kamarDipilih" TEXT NOT NULL,
    "lampiranKTP" TEXT NOT NULL,
    "lampiranKK" TEXT NOT NULL,
    "lampiranFoto" TEXT NOT NULL,
    "lampiranPaspor" TEXT NOT NULL,

    CONSTRAINT "Jamaah_pkey" PRIMARY KEY ("id")
);
