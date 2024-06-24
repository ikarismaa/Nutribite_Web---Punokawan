import { useEffect, useState } from 'react';
import axios from 'axios';
import gambarArtikelSatu from '/src/assets/artikel-1.jpg';
import './style.css';
import { Link } from 'react-router-dom';

const BASE_URL = 'http://localhost:3000';

const ArtikelIndex = () => {
    const [artikelindex, setArtikelIndex] = useState([]);

    useEffect(() => {
        axios.get(`${BASE_URL}/api/artikelindex`)
            .then(response => {
                if (Array.isArray(response.data.data)) {
                    // Ambil tiga artikel pertama
                    setArtikelIndex(response.data.data.slice(0, 3));
                } else {
                    console.error("Expected data to be an array, but got:", response.data.data);
                }
            })
            .catch(error => {
                if (error.response) {
                    console.error('Server responded with a non-2xx status:', error.response.status);
                    console.error('Error message:', error.response.data?.message || 'No message available');
                } else if (error.request) {
                    console.error('No response received:', error.request);
                } else {
                    console.error('Error setting up the request:', error.message);
                }
            });
    }, []);

    return (
        <section className="section" id="artikel">
            <div className="name-artikel">
                <div className="name-artikel-2">
                    <h3>Artikel Terbaru</h3>
                </div>
            </div><br/>
            <div className="grid-container-artikel">
                {artikelindex.map(artikelin => (
                    <div className="artikel-2" key={artikelin.id}>
                        <div className="artikel-bg">
                            <img src={artikelin.img ? `${BASE_URL}/${artikelin.img}` : gambarArtikelSatu} alt={artikelin.judul} />
                            <p>{artikelin.judul}</p>
                            <button className="baca"><Link to={`/deskripsiartikel/${artikelin.id}`}>Baca</Link></button>
                        </div>
                    </div>
                ))}
                <div className="artikel">
                    <h3>Baca artikel yang menarik</h3>
                    <p>Temukan beragam artikel mulai dari tips & trik hingga informasi hidangan yang lezat dan bergizi.</p>
                    <button>Lihat semua</button>
                </div>
            </div>
        </section>
    );
}

export default ArtikelIndex;
