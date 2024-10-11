const editPageJamaah = () => {
    return (
        <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-6">
            <h1 className="text-4xl font-bold mb-8">Edit Data Jamaah</h1>
            <div className="flex gap-4 mb-6">
                <button
                    onClick={() => window.location.href = '/admin/data-jamaah'}
                    className="px-6 py-2 bg-red-600 hover:bg-red-500 rounded-md transition duration-300"
                >
                    Kembali
                </button>
            </div>
        </div>
    );
};

export default editPageJamaah;