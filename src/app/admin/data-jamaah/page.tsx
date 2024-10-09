'use client';
import { useState, useEffect } from 'react';
import { Jamaah } from '../../../interface/Jamaah';
import JamaahService from '../../../services/JamaahService';
import { useAuth } from '../../../hooks/useAuth';

const DataJamaahPage = () => {
  const { logout } = useAuth();
  const [jamaahList, setJamaahList] = useState<Jamaah[]>([]);

  useEffect(() => {
    JamaahService.getAll().then((data) => setJamaahList(data));
  }, []);

  const handleDelete = (id: string) => {
    JamaahService.delete(id).then(() => {
      setJamaahList(jamaahList.filter((item) => item.id !== id));
    });
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-6">
      <h1 className="text-4xl font-bold mb-8">Data Jamaah</h1>
      <div className="flex gap-4 mb-6">
        <button
          onClick={logout}
          className="px-6 py-2 bg-red-600 hover:bg-red-500 rounded-md transition duration-300"
        >
          Logout
        </button>
        <button
          onClick={() => window.location.href = '/admin/data-jamaah/add'}
          className="px-6 py-2 bg-blue-600 hover:bg-blue-500 rounded-md transition duration-300"
        >
          Tambah Data Jamaah
        </button>
      </div>
      
      {/* Data Table */}
      <div className="w-full max-w-5xl overflow-x-auto">
        <table className="w-full text-left table-auto bg-gray-800 rounded-md shadow-lg">
          <thead className="bg-gray-700">
            <tr>
              <th className="px-4 py-2 text-sm font-semibold">Nama Lengkap</th>
              <th className="px-4 py-2 text-sm font-semibold">NIK</th>
              <th className="px-4 py-2 text-sm font-semibold">Tempat Lahir</th>
              <th className="px-4 py-2 text-sm font-semibold">Tanggal Lahir</th>
              <th className="px-4 py-2 text-sm font-semibold">Alamat</th>
              <th className="px-4 py-2 text-sm font-semibold">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {jamaahList.map((jamaah) => (
              <tr key={jamaah.id} className="bg-gray-900 hover:bg-gray-700 transition">
                <td className="px-4 py-2">{jamaah.namaLengkap}</td>
                <td className="px-4 py-2">{jamaah.nik}</td>
                <td className="px-4 py-2">{jamaah.tempatLahir}</td>
                <td className="px-4 py-2">{jamaah.tanggalLahir}</td>
                <td className="px-4 py-2">{jamaah.alamat}</td>
                <td className="px-4 py-2">
                  <div className="flex gap-2">
                    <button
                      onClick={() => window.location.href = `/admin/data-jamaah/${jamaah.id}/edit`}
                      className="px-4 py-1 bg-green-600 hover:bg-green-500 rounded-md transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(jamaah.id)}
                      className="px-4 py-1 bg-red-600 hover:bg-red-500 rounded-md transition"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* No Data Message */}
      {jamaahList.length === 0 && (
        <p className="mt-6 text-gray-400">Tidak ada data jamaah tersedia.</p>
      )}
    </div>
  );
};

export default DataJamaahPage;
