import { NextResponse } from 'next/server';
import { supabase } from '../../lib/supabase'; 


function isValidDate(dateString: string) {
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  return regex.test(dateString);
}


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
    
    }]);

    if (error) throw error;


    return NextResponse.json(newJamaah);
  } catch (error) {
    const errorMessage = (error instanceof Error) ? error.message : 'Unknown error occurred';
    console.error('Error while creating Jamaah:', errorMessage);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
