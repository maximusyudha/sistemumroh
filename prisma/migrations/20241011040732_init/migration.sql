-- CreateTable
CREATE TABLE `Jamaah` (
    `id` VARCHAR(191) NOT NULL,
    `namaLengkap` VARCHAR(191) NOT NULL,
    `nik` VARCHAR(191) NOT NULL,
    `tempatLahir` VARCHAR(191) NOT NULL,
    `tanggalLahir` DATETIME(3) NOT NULL,
    `alamat` VARCHAR(191) NOT NULL,
    `provinsi` VARCHAR(191) NOT NULL,
    `kabKota` VARCHAR(191) NOT NULL,
    `kecamatan` VARCHAR(191) NOT NULL,
    `kelurahan` VARCHAR(191) NOT NULL,
    `jenisKelamin` VARCHAR(191) NOT NULL,
    `noPaspor` VARCHAR(191) NOT NULL,
    `masaBerlakuPaspor` DATETIME(3) NOT NULL,
    `noVisa` VARCHAR(191) NULL,
    `berlakuVisa` DATETIME(3) NULL,
    `paketDipilih` VARCHAR(191) NOT NULL,
    `kamarDipilih` VARCHAR(191) NOT NULL,
    `lampiranKTP` VARCHAR(191) NOT NULL,
    `lampiranKK` VARCHAR(191) NOT NULL,
    `lampiranFoto` VARCHAR(191) NOT NULL,
    `lampiranPaspor` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
