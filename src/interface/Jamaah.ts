export interface Jamaah {
    id: string;
    namaLengkap: string;
    nik: number;
    tempatLahir: string;
    tanggalLahir: string;
    alamat: string;
    provinsi: string;
    kota: string;
    kecamatan: string;
    kelurahan: string;
    jenisKelamin: string;
    noPaspor: string;
    masaBerlakuPaspor: string;
    noVisa?: string;
    berlakuSampaiVisa?: string;
    paketDipilih: string;
    kamarDipilih: string;
    lampiranKTP: string;
    lampiranKK: string;
    lampiranFoto: string;
    lampiranPaspor: string;
  }
  