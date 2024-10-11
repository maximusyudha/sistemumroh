'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation'; 
import JamaahService from '../../../../services/JamaahService'; 
const AddJamaahPage = () => {
  const router = useRouter();
  
  const [namaLengkap, setNamaLengkap] = useState('');
  const [nik, setNik] = useState('');
  const [tempatLahir, setTempatLahir] = useState('');
  const [tanggalLahir, setTanggalLahir] = useState('');
  const [alamat, setAlamat] = useState('');
  const [provinsi, setProvinsi] = useState('');
  const [kabKota, setKabKota] = useState('');
  const [kecamatan, setKecamatan] = useState('');
  const [kelurahan, setKelurahan] = useState('');
  const [jenisKelamin, setJenisKelamin] = useState('');
  const [noPaspor, setNoPaspor] = useState('');
  const [masaBerlakuPaspor, setMasaBerlakuPaspor] = useState('');
  const [lampiranKTP, setLampiranKTP] = useState<File | null>(null);
  const [lampiranKK, setLampiranKK] = useState<File | null>(null);
  const [lampiranFoto, setLampiranFoto] = useState<File | null>(null);
  const [lampiranPaspor, setLampiranPaspor] = useState<File | null>(null);
  const [noVisa, setNoVisa] = useState('');
  const [berlakuVisa, setBerlakuVisa] = useState('');
  const [paketDipilih, setPaketDipilih] = useState('');
  const [kamarDipilih, setKamarDipilih] = useState('Quint');


  

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, setter: React.Dispatch<React.SetStateAction<File | null>>) => {
    if (e.target.files && e.target.files[0]) {
      setter(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('namaLengkap', namaLengkap);
    formData.append('nik', nik);
    formData.append('tempatLahir', tempatLahir);
    formData.append('tanggalLahir', tanggalLahir);
    formData.append('alamat', alamat);
    formData.append('provinsi', provinsi);
    formData.append('kabKota', kabKota);
    formData.append('kecamatan', kecamatan);
    formData.append('kelurahan', kelurahan);
    formData.append('jenisKelamin', jenisKelamin);
    formData.append('noPaspor', noPaspor);
    formData.append('masaBerlakuPaspor', masaBerlakuPaspor);
    formData.append('noVisa', noVisa);
    formData.append('berlakuVisa', berlakuVisa);
    formData.append('paketDipilih', paketDipilih);
    formData.append('kamarDipilih', kamarDipilih);
    

    if (lampiranKTP) formData.append('lampiranKTP', lampiranKTP);
    if (lampiranKK) formData.append('lampiranKK', lampiranKK);
    if (lampiranFoto) formData.append('lampiranFoto', lampiranFoto);
    if (lampiranPaspor) formData.append('lampiranPaspor', lampiranPaspor);

    try {
      await JamaahService.add(formData); 
      router.push('/admin/data-jamaah'); 
    } catch (error) {
      console.error('Error creating Jamaah:', error);
    }
  };
  

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-8">Tambah Data Jamaah</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-3xl bg-gray-800 p-6 rounded-lg shadow-lg space-y-6">
        
        {/* Nama Lengkap */}
        <div>
          <label className="block mb-2">Nama Lengkap Jamaah</label>
          <input
            type="text"
            value={namaLengkap}
            onChange={(e) => setNamaLengkap(e.target.value)}
            className="w-full px-4 py-2 bg-gray-700 rounded-md focus:outline-none"
            required
          />
        </div>
        
        {/* NIK */}
        <div>
          <label className="block mb-2">NIK</label>
          <input
            type="number"
            value={nik}
            onChange={(e) => setNik(e.target.value)}
            className="w-full px-4 py-2 bg-gray-700 rounded-md focus:outline-none"
            required
          />
        </div>

        {/* Tempat & Tanggal Lahir */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block mb-2">Tempat Lahir</label>
            <input
              type="text"
              value={tempatLahir}
              onChange={(e) => setTempatLahir(e.target.value)}
              className="w-full px-4 py-2 bg-gray-700 rounded-md focus:outline-none"
              required
            />
          </div>
          <div>
            <label className="block mb-2">Tanggal Lahir</label>
            <input
              type="date"
              value={tanggalLahir}
              onChange={(e) => setTanggalLahir(e.target.value)}
              className="w-full px-4 py-2 bg-gray-700 rounded-md focus:outline-none"
              required
            />
          </div>
        </div>

        {/* Alamat */}
        <div>
          <label className="block mb-2">Alamat</label>
          <textarea
            value={alamat}
            onChange={(e) => setAlamat(e.target.value)}
            className="w-full px-4 py-2 bg-gray-700 rounded-md focus:outline-none"
            required
          ></textarea>
        </div>

        {/* Provinsi, Kab/Kota, Kecamatan, Kelurahan/Desa */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <label className="block mb-2">Provinsi</label>
            <select
              value={provinsi}
              onChange={(e) => setProvinsi(e.target.value)}
              className="w-full px-4 py-2 bg-gray-700 rounded-md focus:outline-none"
              required
            >
              <option value="">Pilih Provinsi</option>
              
            </select>
          </div>
          <div>
            <label className="block mb-2">Kab/Kota</label>
            <select
              value={kabKota}
              onChange={(e) => setKabKota(e.target.value)}
              className="w-full px-4 py-2 bg-gray-700 rounded-md focus:outline-none"
              required
            >
              <option value="">Pilih Kab/Kota</option>
              
            </select>
          </div>
          <div>
            <label className="block mb-2">Kecamatan</label>
            <select
              value={kecamatan}
              onChange={(e) => setKecamatan(e.target.value)}
              className="w-full px-4 py-2 bg-gray-700 rounded-md focus:outline-none"
              required
            >
              <option value="">Pilih Kecamatan</option>
              
            </select>
          </div>
          <div>
            <label className="block mb-2">Kelurahan/Desa</label>
            <select
              value={kelurahan}
              onChange={(e) => setKelurahan(e.target.value)}
              className="w-full px-4 py-2 bg-gray-700 rounded-md focus:outline-none"
              required
            >
              <option value="">Pilih Kelurahan/Desa</option>
              
            </select>
          </div>
        </div>

        {/* Jenis Kelamin */}
        <div>
          <label className="block mb-2">Jenis Kelamin</label>
          <div className="flex gap-4">
            <label className="flex items-center">
              <input
                type="radio"
                value="Laki-Laki"
                onChange={() => setJenisKelamin('Laki-Laki')}
                checked={jenisKelamin === 'Laki-Laki'}
                className="mr-2"
              />
              Laki-Laki
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                value="Perempuan"
                onChange={() => setJenisKelamin('Perempuan')}
                checked={jenisKelamin === 'Perempuan'}
                className="mr-2"
              />
              Perempuan
            </label>
          </div>
        </div>

        {/* Paspor */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block mb-2">No Paspor</label>
            <input
              type="text"
              value={noPaspor}
              onChange={(e) => setNoPaspor(e.target.value)}
              className="w-full px-4 py-2 bg-gray-700 rounded-md focus:outline-none"
            />
          </div>
          <div>
            <label className="block mb-2">Masa Berlaku Paspor</label>
            <input
              type="date"
              value={masaBerlakuPaspor}
              onChange={(e) => setMasaBerlakuPaspor(e.target.value)}
              className="w-full px-4 py-2 bg-gray-700 rounded-md focus:outline-none"
            />
          </div>
        </div>

        {/* Lampiran Upload */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block mb-2">Lampiran KTP</label>
            <input
              type="file"
              onChange={(e) => handleFileChange(e, setLampiranKTP)}
              className="w-full px-4 py-2 bg-gray-700 rounded-md focus:outline-none"
              required
            />
          </div>
          <div>
            <label className="block mb-2">Lampiran KK</label>
            <input
              type="file"
              onChange={(e) => handleFileChange(e, setLampiranKK)}
              className="w-full px-4 py-2 bg-gray-700 rounded-md focus:outline-none"
              required
            />
          </div>
          <div>
            <label className="block mb-2">Lampiran Foto Diri</label>
            <input
              type="file"
              onChange={(e) => handleFileChange(e, setLampiranFoto)}
              className="w-full px-4 py-2 bg-gray-700 rounded-md focus:outline-none"
              required
            />
          </div>
          <div>
            <label className="block mb-2">Lampiran Paspor</label>
            <input
              type="file"
              onChange={(e) => handleFileChange(e, setLampiranPaspor)}
              className="w-full px-4 py-2 bg-gray-700 rounded-md focus:outline-none"
            />
          </div>
        </div>

        {/* No Visa (Optional) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block mb-2">No Visa (Opsional)</label>
            <input
              type="text"
              value={noVisa}
              onChange={(e) => setNoVisa(e.target.value)}
              className="w-full px-4 py-2 bg-gray-700 rounded-md focus:outline-none"
            />
          </div>
          <div>
            <label className="block mb-2">Berlaku Sampai (Opsional)</label>
            <input
              type="date"
              value={berlakuVisa}
              onChange={(e) => setBerlakuVisa(e.target.value)}
              className="w-full px-4 py-2 bg-gray-700 rounded-md focus:outline-none"
            />
          </div>
        </div>

        {/* Paket Dipilih */}
        <div>
          <label className="block mb-2">Paket Dipilih</label>
          <select
            value={paketDipilih}
            onChange={(e) => setPaketDipilih(e.target.value)}
            className="w-full px-4 py-2 bg-gray-700 rounded-md focus:outline-none"
            required
          >
            <option value="">Pilih Paket</option>
            <option value="Paket Itikaf">Paket Itikaf</option>
            <option value="Paket Reguler">Paket Reguler</option>
            <option value="Paket VIP">Paket VIP</option>
          </select>
        </div>

        {/* Kamar Dipilih */}
        <div>
          <label className="block mb-2">Kamar Dipilih</label>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setKamarDipilih('Quint')}
              className={`px-4 py-2 rounded-md ${kamarDipilih === 'Quint' ? 'bg-blue-500' : 'bg-gray-700'}`}
            >
              Quint
            </button>
            <button
              type="button"
              onClick={() => setKamarDipilih('Quad')}
              className={`px-4 py-2 rounded-md ${kamarDipilih === 'Quad' ? 'bg-blue-500' : 'bg-gray-700'}`}
            >
              Quad
            </button>
            <button
              type="button"
              onClick={() => setKamarDipilih('Triple')}
              className={`px-4 py-2 rounded-md ${kamarDipilih === 'Triple' ? 'bg-blue-500' : 'bg-gray-700'}`}
            >
              Triple
            </button>
            <button
              type="button"
              onClick={() => setKamarDipilih('Double')}
              className={`px-4 py-2 rounded-md ${kamarDipilih === 'Double' ? 'bg-blue-500' : 'bg-gray-700'}`}
            >
              Double
            </button>
            <button
              type="button"
              onClick={() => setKamarDipilih('Single')}
              className={`px-4 py-2 rounded-md ${kamarDipilih === 'Single' ? 'bg-blue-500' : 'bg-gray-700'}`}
            >
              Single
            </button>
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-6">
          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-500 px-6 py-3 rounded-md font-semibold text-lg"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddJamaahPage;
