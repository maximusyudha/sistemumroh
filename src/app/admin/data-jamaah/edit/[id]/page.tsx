'use client';
import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import JamaahService from '../../../../../services/JamaahService';
import { Jamaah } from '../../../../../interface/Jamaah';

const EditJamaahPage = () => {
  const router = useRouter();
  const { id } = useParams();  
  const [jamaah, setJamaah] = useState<Jamaah | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      JamaahService.getById(id as string).then((data) => {
        setJamaah(data);
        setLoading(false);
      });
    }
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    if (jamaah) {
      setJamaah({ ...jamaah, [e.target.name]: e.target.value });
    }
  };
  

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (jamaah) {
      JamaahService.update(jamaah.id, jamaah).then(() => {
        router.push('/admin/data-jamaah'); 
      });
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-8">Edit Data Jamaah</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-3xl bg-gray-800 p-6 rounded-lg shadow-lg space-y-6">
        {/* Nama Lengkap */}
        <div>
          <label className="block mb-2">Nama Lengkap Jamaah</label>
          <input
            type="text"
            name="namaLengkap"
            value={jamaah?.namaLengkap || ''}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-gray-700 rounded-md focus:outline-none"
            required
          />
        </div>

        {/* NIK */}
        <div>
          <label className="block mb-2">NIK</label>
          <input
            type="number"
            name="nik"
            value={jamaah?.nik || ''}
            onChange={handleChange}
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
              name="tempatLahir"
              value={jamaah?.tempatLahir || ''}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-700 rounded-md focus:outline-none"
              required
            />
          </div>
          <div>
            <label className="block mb-2">Tanggal Lahir</label>
            <input
              type="date"
              name="tanggalLahir"
              value={jamaah?.tanggalLahir || ''}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-700 rounded-md focus:outline-none"
              required
            />
          </div>
        </div>

        {/* Alamat */}
        <div>
          <label className="block mb-2">Alamat</label>
          <textarea
            name="alamat"
            value={jamaah?.alamat || ''}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-gray-700 rounded-md focus:outline-none"
            required
          />
        </div>

        {/* Jenis Kelamin */}
        <div>
          <label className="block mb-2">Jenis Kelamin</label>
          <select
            name="jenisKelamin"
            value={jamaah?.jenisKelamin || ''}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-gray-700 rounded-md focus:outline-none"
            required
          >
            <option value="">Pilih Jenis Kelamin</option>
            <option value="Laki-laki">Laki-laki</option>
            <option value="Perempuan">Perempuan</option>
          </select>
        </div>

        {/* No Visa & Berlaku Visa */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block mb-2">No Visa</label>
            <input
              type="text"
              name="noVisa"
              value={jamaah?.noVisa || ''}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-700 rounded-md focus:outline-none"
            />
          </div>
          <div>
            <label className="block mb-2">Berlaku Visa</label>
            <input
              type="date"
              name="berlakuVisa"
              value={jamaah?.berlakuVisa || ''}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-700 rounded-md focus:outline-none"
            />
          </div>
        </div>

        {/* Paket Dipilih */}
        <div>
          <label className="block mb-2">Paket Dipilih</label>
          <select
            name="paketDipilih"
            value={jamaah?.paketDipilih || ''}
            onChange={handleChange}
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
            name="kamarDipilih"
            value={jamaah?.kamarDipilih || ''}
            onChange={handleChange}
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
          Update Jamaah
        </button>
      </form>
    </div>
  );
};

export default EditJamaahPage;
