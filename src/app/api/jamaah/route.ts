import { NextResponse } from 'next/server';
import { supabase } from '../../lib/supabase'; // Import Supabase client
import { randomUUID } from 'crypto';

// Function to validate date format (YYYY-MM-DD)
function isValidDate(dateString: string) {
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  return regex.test(dateString);
}

// Function to generate a unique file name
const generateUniqueFileName = (originalName: string) => {
  const fileExtension = originalName.split('.').pop();
  return `${randomUUID()}.${fileExtension}`;
};

// Helper function to upload files to Supabase storage directly
async function uploadFile(file: File | null, folder: string) {
  if (!file) return null; // No file to upload
  const fileName = generateUniqueFileName(file.name); // Generate unique filename

  // Read the file content (array buffer) to upload it to Supabase directly
  const fileBuffer = await file.arrayBuffer();

  const { data: fileData, error } = await supabase.storage
    .from(folder)
    .upload(fileName, new Blob([fileBuffer], { type: file.type }));

  if (error) {
    console.error(`Error uploading file ${file.name}:`, error.message);
    throw new Error(`File upload failed for ${file.name}`);
  }

  // Return the path where the file is stored in Supabase
  return fileData?.path;
}

// POST: Add new Jamaah
export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);

    // Validate date fields
    if (!isValidDate(data.tanggalLahir as string)) {
      return NextResponse.json({ error: 'Invalid date format for tanggalLahir' }, { status: 400 });
    }
    if (data.masaBerlakuPaspor && !isValidDate(data.masaBerlakuPaspor as string)) {
      return NextResponse.json({ error: 'Invalid date format for masaBerlakuPaspor' }, { status: 400 });
    }

    // Retrieve files from form data
    const lampiranKTPFile = formData.get('lampiranKTP') as File | null;
    const lampiranKKFile = formData.get('lampiranKK') as File | null;
    const lampiranFotoFile = formData.get('lampiranFoto') as File | null;
    const lampiranPasporFile = formData.get('lampiranPaspor') as File | null;

    // Upload files to Supabase storage directly (if they exist)
    const lampiranKTPPath = await uploadFile(lampiranKTPFile, 'uploads');
    const lampiranKKPath = await uploadFile(lampiranKKFile, 'uploads');
    const lampiranFotoPath = await uploadFile(lampiranFotoFile, 'uploads');
    const lampiranPasporPath = await uploadFile(lampiranPasporFile, 'uploads');

    // Insert new Jamaah into the Supabase database
    const { data: newJamaah, error } = await supabase.from('jamaah').insert([{
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
      lampiranKTP: lampiranKTPPath ? `/storage/uploads/${lampiranKTPPath}` : null,
      lampiranKK: lampiranKKPath ? `/storage/uploads/${lampiranKKPath}` : null,
      lampiranFoto: lampiranFotoPath ? `/storage/uploads/${lampiranFotoPath}` : null,
      lampiranPaspor: lampiranPasporPath ? `/storage/uploads/${lampiranPasporPath}` : null,
    }]);

    if (error) throw error;

    // Respond with the newly created Jamaah data
    return NextResponse.json(newJamaah);
  } catch (error) {
    const errorMessage = (error instanceof Error) ? error.message : 'Unknown error occurred';
    console.error('Error while creating Jamaah:', errorMessage);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
