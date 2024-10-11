import { NextResponse } from 'next/server';
import { prisma } from '../../lib/prisma';
import { promises as fs } from 'fs';
import path from 'path';
import { randomUUID } from 'crypto';

// Define the upload directory
const uploadDirectory = path.join(process.cwd(), 'public', 'uploads');

// Function to validate date format (YYYY-MM-DD)
function isValidDate(dateString: string) {
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  return dateString.match(regex) !== null;
}

// Function to generate unique file name
const generateUniqueFileName = (originalName: string) => {
  const fileExtension = path.extname(originalName);
  const fileNameWithoutExt = path.basename(originalName, fileExtension);
  return `${fileNameWithoutExt}-${randomUUID()}${fileExtension}`;
};

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

    // Validasi format tanggal lahir dan masa berlaku paspor
    if (!isValidDate(data.tanggalLahir as string)) {
      throw new Error('Invalid date format for tanggalLahir');
    }

    if (data.masaBerlakuPaspor && !isValidDate(data.masaBerlakuPaspor as string)) {
      throw new Error('Invalid date format for masaBerlakuPaspor');
    }

    // Create the upload directory if it doesn't exist
    await fs.mkdir(uploadDirectory, { recursive: true });

    const lampiranKTPFile = formData.get('lampiranKTP') as File | null;
    const lampiranKKFile = formData.get('lampiranKK') as File | null;
    const lampiranFotoFile = formData.get('lampiranFoto') as File | null;
    const lampiranPasporFile = formData.get('lampiranPaspor') as File | null;

    let lampiranKTPFileName = '', lampiranKKFileName = '', lampiranFotoFileName = '', lampiranPasporFileName = '';

    // Upload lampiranKTP jika ada
    if (lampiranKTPFile) {
      lampiranKTPFileName = generateUniqueFileName(lampiranKTPFile.name);
      const lampiranKTPPath = path.join(uploadDirectory, lampiranKTPFileName);
      await fs.writeFile(lampiranKTPPath, Buffer.from(await lampiranKTPFile.arrayBuffer()));
    }

    // Upload lampiranKK jika ada
    if (lampiranKKFile) {
      lampiranKKFileName = generateUniqueFileName(lampiranKKFile.name);
      const lampiranKKPath = path.join(uploadDirectory, lampiranKKFileName);
      await fs.writeFile(lampiranKKPath, Buffer.from(await lampiranKKFile.arrayBuffer()));
    }

    // Upload lampiranFoto jika ada
    if (lampiranFotoFile) {
      lampiranFotoFileName = generateUniqueFileName(lampiranFotoFile.name);
      const lampiranFotoPath = path.join(uploadDirectory, lampiranFotoFileName);
      await fs.writeFile(lampiranFotoPath, Buffer.from(await lampiranFotoFile.arrayBuffer()));
    }

    // Upload lampiranPaspor jika ada
    if (lampiranPasporFile) {
      lampiranPasporFileName = generateUniqueFileName(lampiranPasporFile.name);
      const lampiranPasporPath = path.join(uploadDirectory, lampiranPasporFileName);
      await fs.writeFile(lampiranPasporPath, Buffer.from(await lampiranPasporFile.arrayBuffer()));
    }

    // Insert new Jamaah into the database
    const newJamaah = await prisma.jamaah.create({
      data: {
        namaLengkap: String(data.namaLengkap),
        nik: String(data.nik),
        tempatLahir: String(data.tempatLahir),
        tanggalLahir: new Date(data.tanggalLahir as string),
        alamat: String(data.alamat),
        provinsi: String(data.provinsi),
        kabKota: String(data.kabKota),
        kecamatan: String(data.kecamatan),
        kelurahan: String(data.kelurahan),
        jenisKelamin: String(data.jenisKelamin),
        noPaspor: String(data.noPaspor),
        masaBerlakuPaspor: new Date(data.masaBerlakuPaspor as string),
        noVisa: data.noVisa ? String(data.noVisa) : null,
        berlakuVisa: data.berlakuVisa ? new Date(data.berlakuVisa as string) : null,
        paketDipilih: String(data.paketDipilih),
        kamarDipilih: String(data.kamarDipilih),
        lampiranKTP: lampiranKTPFileName ? `/uploads/${lampiranKTPFileName}`: String(data.lampiranKTP),
        lampiranKK: lampiranKKFileName ? `/uploads/${lampiranKKFileName}` : String(data.lampiranKK),
        lampiranFoto: lampiranFotoFileName ? `/uploads/${lampiranFotoFileName}` : String(data.lampiranFoto),
        lampiranPaspor: lampiranPasporFileName ? `/uploads/${lampiranPasporFileName}` : String(data.lampiranPaspor),
      },
    });

    return NextResponse.json(newJamaah);
  } catch (error) {
    const errorMessage = (error instanceof Error) ? error.message : 'Unknown error occurred';
    console.error(errorMessage);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
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
      where: { id: id}, 
    });
    return NextResponse.json({ message: 'Jamaah deleted successfully' });
  } catch (error) {
    const errorMessage = (error instanceof Error) ? error.message : 'Unknown error occurred';
    console.error(errorMessage);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
