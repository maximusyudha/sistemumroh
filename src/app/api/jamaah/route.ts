import { NextResponse } from 'next/server';
import { supabase } from '../../lib/supabase'; // Import supabase client
import { randomUUID } from 'crypto';

// Function to validate date format (YYYY-MM-DD)
function isValidDate(dateString: string) {
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  return dateString.match(regex) !== null;
}

// Function to generate unique file name
const generateUniqueFileName = (originalName: string) => {
  const fileExtension = originalName.split('.').pop();
  return `${randomUUID()}.${fileExtension}`;
};

// GET: Fetch all Jamaah
export async function GET() {
  try {
    const { data, error } = await supabase.from('jamaah').select('*');
    if (error) throw error;
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching Jamaah list:', error);
    return NextResponse.json({ error: 'Error fetching data' }, { status: 500 });
  }
}

// POST: Add new Jamaah
export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);

    // Validate date fields
    if (!isValidDate(data.tanggalLahir as string)) {
      throw new Error('Invalid date format for tanggalLahir');
    }
    if (data.masaBerlakuPaspor && !isValidDate(data.masaBerlakuPaspor as string)) {
      throw new Error('Invalid date format for masaBerlakuPaspor');
    }

    // File processing for uploads
    const lampiranKTPFile = formData.get('lampiranKTP') as File | null;
    const lampiranKKFile = formData.get('lampiranKK') as File | null;
    const lampiranFotoFile = formData.get('lampiranFoto') as File | null;
    const lampiranPasporFile = formData.get('lampiranPaspor') as File | null;

    // Helper function to upload files to Supabase storage
    const uploadFile = async (file: File | null, folder: string) => {
      if (!file) return null;
      const fileName = generateUniqueFileName(file.name);
      const { data: fileData, error } = await supabase.storage
        .from(folder)
        .upload(fileName, file);
      if (error) throw error;
      return fileData?.path;
    };

    const lampiranKTPPath = await uploadFile(lampiranKTPFile, 'uploads');
    const lampiranKKPath = await uploadFile(lampiranKKFile, 'uploads');
    const lampiranFotoPath = await uploadFile(lampiranFotoFile, 'uploads');
    const lampiranPasporPath = await uploadFile(lampiranPasporFile, 'uploads');

    // Insert new Jamaah into the Supabase database
    const { data: newJamaah, error } = await supabase.from('jamaah').insert([
      {
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
        lampiranKTP: lampiranKTPPath ? `/storage/uploads/${lampiranKTPPath}` : String(data.lampiranKTP),
        lampiranKK: lampiranKKPath ? `/storage/uploads/${lampiranKKPath}` : String(data.lampiranKK),
        lampiranFoto: lampiranFotoPath ? `/storage/uploads/${lampiranFotoPath}` : String(data.lampiranFoto),
        lampiranPaspor: lampiranPasporPath ? `/storage/uploads/${lampiranPasporPath}` : String(data.lampiranPaspor),
      },
    ]);

    if (error) throw error;

    console.log('New Jamaah created:', newJamaah);
    return NextResponse.json(newJamaah);
  } catch (error) {
    const errorMessage = (error instanceof Error) ? error.message : 'Unknown error occurred';
    console.error('Error while creating Jamaah:', errorMessage);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

// DELETE: Remove Jamaah by ID
export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({ error: 'ID is required' }, { status: 400 });
  }

  try {
    const { error } = await supabase.from('jamaah').delete().eq('id', Number(id));
    if (error) throw error;
    return NextResponse.json({ message: 'Jamaah deleted successfully' });
  } catch (error) {
    const errorMessage = (error instanceof Error) ? error.message : 'Unknown error occurred';
    console.error('Error deleting Jamaah:', errorMessage);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

// PUT: Update Jamaah by ID
export async function PUT(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id || isNaN(Number(id))) {
    return NextResponse.json({ error: 'Valid ID is required' }, { status: 400 });
  }

  try {
    const { data } = await request.json();
    if (!isValidDate(data.tanggalLahir as string) ||
      (data.masaBerlakuPaspor && !isValidDate(data.masaBerlakuPaspor as string))) {
      return NextResponse.json({ error: 'Invalid date format' }, { status: 400 });
    }

    const { error } = await supabase.from('jamaah').update({
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
    }).eq('id', Number(id));

    if (error) throw error;

    return NextResponse.json({ message: 'Jamaah updated successfully' });
  } catch (error) {
    const errorMessage = (error instanceof Error) ? error.message : 'Unknown error occurred';
    console.error('Error updating Jamaah:', errorMessage);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
