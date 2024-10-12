import { NextResponse } from 'next/server';
import { prisma } from '../../lib/prisma';
import { supabase } from '../../lib/supabase'; // import supabase client
import { randomUUID } from 'crypto';
import path from 'path';
import { Prisma } from '@prisma/client';

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

// Helper function to upload a file to Supabase Storage
const uploadToSupabase = async (file: File, bucket: string) => {
  const fileName = generateUniqueFileName(file.name);
  const { data, error } = await supabase.storage.from(bucket).upload(fileName, file);

  if (error) {
    throw new Error(`Failed to upload ${file.name}: ${error.message}`);
  }

  return data.path; // Return the file path
};

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);

    // Validate date formats
    if (!isValidDate(data.tanggalLahir as string)) {
      throw new Error('Invalid date format for tanggalLahir');
    }

    if (data.masaBerlakuPaspor && !isValidDate(data.masaBerlakuPaspor as string)) {
      throw new Error('Invalid date format for masaBerlakuPaspor');
    }

    // File processing using Supabase Storage
    const bucketName = 'uploads'; // Your Supabase storage bucket name
    const lampiranKTPFile = formData.get('lampiranKTP') as File | null;
    const lampiranKKFile = formData.get('lampiranKK') as File | null;
    const lampiranFotoFile = formData.get('lampiranFoto') as File | null;
    const lampiranPasporFile = formData.get('lampiranPaspor') as File | null;

    let lampiranKTPPath = '', lampiranKKPath = '', lampiranFotoPath = '', lampiranPasporPath = '';

    if (lampiranKTPFile) {
      lampiranKTPPath = await uploadToSupabase(lampiranKTPFile, bucketName);
    }

    if (lampiranKKFile) {
      lampiranKKPath = await uploadToSupabase(lampiranKKFile, bucketName);
    }

    if (lampiranFotoFile) {
      lampiranFotoPath = await uploadToSupabase(lampiranFotoFile, bucketName);
    }

    if (lampiranPasporFile) {
      lampiranPasporPath = await uploadToSupabase(lampiranPasporFile, bucketName);
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
        lampiranKTP: lampiranKTPPath || String(data.lampiranKTP),
        lampiranKK: lampiranKKPath || String(data.lampiranKK),
        lampiranFoto: lampiranFotoPath || String(data.lampiranFoto),
        lampiranPaspor: lampiranPasporPath || String(data.lampiranPaspor),
      },
    });

    return NextResponse.json(newJamaah);
  } catch (error) {
    const errorMessage = (error instanceof Error) ? error.message : 'Unknown error occurred';
    console.error('Error while creating Jamaah:', errorMessage);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}


export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  // Ensure the ID is present and valid
  if (!id || isNaN(Number(id))) {
    return NextResponse.json({ error: 'Valid ID is required' }, { status: 400 });
  }

  try {
    // Try to delete the Jamaah
    const deletedJamaah = await prisma.jamaah.delete({
      where: { id: Number(id) },
    });

    // Return a success response if deletion was successful
    return NextResponse.json({ message: 'Jamaah deleted successfully', data: deletedJamaah });
  } catch (error) {
    // Check for the Prisma-specific error that indicates the record doesn't exist
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
      return NextResponse.json({ error: 'Jamaah not found' }, { status: 404 });
    }

    // General error handling
    const errorMessage = (error instanceof Error) ? error.message : 'Unknown error occurred';
    console.error('Error deleting Jamaah:', errorMessage);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}


export async function PUT(request: Request) { 
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id || isNaN(Number(id))) {
    return NextResponse.json({ error: 'Valid ID is required' }, { status: 400 });
  }

  try { 
    const jamaah = await prisma.jamaah.findUnique({ where: { id: Number(id) } });
    if (!jamaah) {
      return NextResponse.json({ error: 'Jamaah not found' }, { status: 404 });
    }

    const data = await request.json();

    // Validate dates before updating
    if (!isValidDate(data.tanggalLahir as string) || 
        (data.masaBerlakuPaspor && !isValidDate(data.masaBerlakuPaspor as string))) {
      return NextResponse.json({ error: 'Invalid date format' }, { status: 400 });
    }

    const updatedJamaah = await prisma.jamaah.update({
      where: { id: Number(id) },
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
        lampiranKTP: String(data.lampiranKTP),
        lampiranKK: String(data.lampiranKK),
        lampiranFoto: String(data.lampiranFoto),
        lampiranPaspor: String(data.lampiranPaspor),
      },
    });

    return NextResponse.json(updatedJamaah);
  } catch (error) {
    const errorMessage = (error instanceof Error) ? error.message : 'Unknown error occurred';
    console.error('Error updating Jamaah:', errorMessage);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
