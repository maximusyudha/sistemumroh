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

  const provinsiOptions = ['Jawa Barat', 'Jawa Tengah', 'Jawa Timur'];
  const kabKotaOptions = ['Bandung', 'Semarang', 'Surabaya'];
  const kecamatanOptions = ['Kecamatan A', 'Kecamatan B', 'Kecamatan C'];
  const kelurahanOptions = ['Kelurahan X', 'Kelurahan Y', 'Kelurahan Z'];

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
              {provinsiOptions.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
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
              {kabKotaOptions.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
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
              {kecamatanOptions.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
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
              {kelurahanOptions.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Jenis Kelamin */}
        <div>
          <label className="block mb-2">Jenis Kelamin</label>
          <select
            value={jenisKelamin}
            onChange={(e) => setJenisKelamin(e.target.value)}
            className="w-full px-4 py-2 bg-gray-700 rounded-md focus:outline-none"
            required
          >
            <option value="">Pilih Jenis Kelamin</option>
            <option value="Laki-laki">Laki-laki</option>
            <option value="Perempuan">Perempuan</option>
          </select>
        </div>

        {/* No Paspor & Masa Berlaku Paspor */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block mb-2">No Paspor</label>
            <input
              type="text"
              value={noPaspor}
              onChange={(e) => setNoPaspor(e.target.value)}
              className="w-full px-4 py-2 bg-gray-700 rounded-md focus:outline-none"
              required
            />
          </div>
          <div>
            <label className="block mb-2">Masa Berlaku Paspor</label>
            <input
              type="date"
              value={masaBerlakuPaspor}
              onChange={(e) => setMasaBerlakuPaspor(e.target.value)}
              className="w-full px-4 py-2 bg-gray-700 rounded-md focus:outline-none"
              required
            />
          </div>
        </div>

        {/* Lampiran KTP, KK, Foto, Paspor */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block mb-2">Lampiran KTP</label>
            <input
              type="file"
              onChange={(e) => handleFileChange(e, setLampiranKTP)}
              className="w-full bg-gray-700 rounded-md focus:outline-none"
              required
            />
          </div>
          <div>
            <label className="block mb-2">Lampiran KK</label>
            <input
              type="file"
              onChange={(e) => handleFileChange(e, setLampiranKK)}
              className="w-full bg-gray-700 rounded-md focus:outline-none"
              required
            />
          </div>
          <div>
            <label className="block mb-2">Lampiran Foto</label>
            <input
              type="file"
              onChange={(e) => handleFileChange(e, setLampiranFoto)}
              className="w-full bg-gray-700 rounded-md focus:outline-none"
              required
            />
          </div>
          <div>
            <label className="block mb-2">Lampiran Paspor</label>
            <input
              type="file"
              onChange={(e) => handleFileChange(e, setLampiranPaspor)}
              className="w-full bg-gray-700 rounded-md focus:outline-none"
              required
            />
          </div>
        </div>

        {/* No Visa & Berlaku Visa */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block mb-2">No Visa</label>
            <input
              type="text"
              value={noVisa}
              onChange={(e) => setNoVisa(e.target.value)}
              className="w-full px-4 py-2 bg-gray-700 rounded-md focus:outline-none"
            />
          </div>
          <div>
            <label className="block mb-2">Berlaku Visa</label>
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
            <option value="Paket A">Paket A</option>
            <option value="Paket B">Paket B</option>
            <option value="Paket C">Paket C</option>
          </select>
        </div>

        {/* Kamar Dipilih */}
        <div>
          <label className="block mb-2">Kamar Dipilih</label>
          <select
            value={kamarDipilih}
            onChange={(e) => setKamarDipilih(e.target.value)}
            className="w-full px-4 py-2 bg-gray-700 rounded-md focus:outline-none"
            required
          >
            <option value="Quint">Kamar Quint</option>
            <option value="Triple">Kamar Triple</option>
            <option value="Double">Kamar Double</option>
          </select>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-2 bg-blue-600 rounded-md hover:bg-blue-500 transition duration-200"
        >
          Tambah Jamaah
        </button>
      </form>
    </div>
  );
};

export default AddJamaahPage;
