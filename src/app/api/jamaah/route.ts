import { NextResponse } from 'next/server';
import { prisma } from '../../lib/prisma'; // Pastikan path ini sesuai dengan struktur proyek Anda

export async function GET() {
  try {
    const jamaahList = await prisma.jamaah.findMany();
    return NextResponse.json(jamaahList);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error fetching data' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);

    // Validasi data yang diterima
    if (!data.namaLengkap || !data.nik) {
      return NextResponse.json({ error: 'Nama Lengkap dan NIK wajib diisi' }, { status: 400 });
    }

    const newJamaah = await prisma.jamaah.create({
        data: {
          namaLengkap: String(data.namaLengkap), // Pastikan ini adalah string
          nik: String(data.nik),
          tempatLahir: String(data.tempatLahir),
          tanggalLahir: new Date(data.tanggalLahir as string), // Pastikan ini adalah string yang bisa diubah menjadi Date
          alamat: String(data.alamat),
          provinsi: String(data.provinsi),
          kabKota: String(data.kabKota),
          kecamatan: String(data.kecamatan),
          kelurahan: String(data.kelurahan),
          jenisKelamin: String(data.jenisKelamin),
          noPaspor: String(data.noPaspor),
          masaBerlakuPaspor: new Date(data.masaBerlakuPaspor as string), // Pastikan ini adalah string yang bisa diubah menjadi Date
          noVisa: data.noVisa ? String(data.noVisa) : null,
          berlakuVisa: data.berlakuVisa ? new Date(data.berlakuVisa as string) : null,
          paketDipilih: String(data.paketDipilih),
          kamarDipilih: String(data.kamarDipilih),
          lampiranKTP: String(data.lampiranKTP), // Asumsi ini adalah URL atau path ke file
          lampiranKK: String(data.lampiranKK),
          lampiranFoto: String(data.lampiranFoto),
          lampiranPaspor: String(data.lampiranPaspor),
        },
      });
      
    return NextResponse.json(newJamaah);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error creating Jamaah' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({ error: 'ID is required' }, { status: 400 });
  }

  try {
    await prisma.jamaah.delete({
      where: { id },
    });
    return NextResponse.json({ message: 'Jamaah deleted successfully' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error deleting Jamaah' }, { status: 500 });
  }
}
