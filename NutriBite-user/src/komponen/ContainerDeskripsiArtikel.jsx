import { useState, useEffect } from 'react';
import './style.css'
import artikelImage from '/src/assets/artikel-1.jpg'; // Pastikan path gambar benar
import { useParams } from 'react-router-dom';

const BASE_URL = 'http://localhost:3000';

const ContainerDeskripsiArtikel = () => {
  const [artikel, setArtikel] = useState(null); // State untuk menyimpan data resep
  const [loading, setLoading] = useState(true); // State untuk menampilkan loading
  const [error, setError] = useState(false); // State untuk menangani error

  const artikelId = '2';  // Ganti dengan id resep yang ingin ditampilkan
  let { id } = useParams();

  useEffect(() => {
    setLoading(true); // Set loading true sebelum melakukan fetch
    console.log(`Fetching recipe with ID: ${id}`); // Logging

    fetch(`${BASE_URL}/api/artikel/${id}`) // Gunakan resepId dalam URL
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('Artikel data:', data); // Logging
        setArtikel(data);
        setLoading(false); // Set loading false setelah data berhasil dimuat
      })
      .catch(error => {
        console.error('Error fetching Artikel:', error);
        setError(true); // Mengeset error menjadi true jika terjadi error
        setLoading(false); // Set loading false dalam kasus error
      });
  }, [artikelId]);

  if (loading) {
    return <div>Loading...</div>;  // Tampilkan pesan loading jika data resep sedang diambil
  }

  if (error) {
    return <div>Error fetching artikel. Please try again later.</div>;  // Tampilkan pesan error jika tidak dapat mengambil data resep
  }

  if (!artikel) {
    return <div>No artikel found.</div>;  // Menampilkan pesan jika tidak ada data resep
  }

  return (
    <>
      <section className="page-tampilan-artikel">
        <div className="card-row-tampilan-artikel">
          <div className="card-tampilan-artikel">
            <h3>{artikel.judul}</h3>
            <br />
            <img src={artikel.img ? `${BASE_URL}/${artikel.img}` : artikelImage} alt={artikel.img} className="card-image-tampilan-artikel"/>
            <div className="card-content-tampilan-artikel">
              <p dangerouslySetInnerHTML={{ __html: artikel.deskripsi }} >
                </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default ContainerDeskripsiArtikel;
