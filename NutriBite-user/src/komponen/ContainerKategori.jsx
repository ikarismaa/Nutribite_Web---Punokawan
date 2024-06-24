import { useEffect, useState } from 'react';
import sotoImage from '../assets/soto.jpg';
import './style.css';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';

const BASE_URL = 'http://localhost:3000';

const ContainerKategori = () => {
  const [kategori, setKategori] = useState([]);
  const location = useLocation();
  const nama = new URLSearchParams(location.search).get('nama');

  const getKategori = (kategoriName) => {
    axios.get(`${BASE_URL}/api/resep/kategori`, {
      params: {
        kategori_name: kategoriName
      }
    })
    .then(response => {
      setKategori(response.data);
    })
    .catch(error => {
      console.error('Error fetching recipe:', error);
    });
  }

  useEffect(() => {
    if (nama) {
      getKategori(nama);
    }
  }, [nama]);

  return (
    <>
      <section className="kategori-menu">
        <div className="name-categories">
          <h1>Kategori</h1>
        </div>
        <div className="categories">
          <button className={nama === 'ayam' ? 'active-link' : ''}><Link to="/kategori?nama=ayam" style={{ textDecoration: 'none', color: '#333' }}>Ayam</Link></button>
          <button className={nama === 'sayuran' ? 'active-link' : ''}><Link to="/kategori?nama=sayuran"style={{ textDecoration: 'none', color: '#333' }}>Sayuran</Link></button>
          <button className={nama === 'sapi' ? 'active-link' : ''}><Link to="/kategori?nama=sapi"style={{ textDecoration: 'none', color: '#333' }}>Sapi</Link></button>
          <button className={nama === 'makanan-laut' ? 'active-link' : ''}><Link to="/kategori?nama=makanan-laut"style={{ textDecoration: 'none', color: '#333' }}>Makanan Laut</Link></button>
          <button className={nama === 'pasta' ? 'active-link' : ''}><Link to="/kategori?nama=pasta" style={{ textDecoration: 'none', color: '#333' }}>Pasta</Link></button>
        </div>
        <div className="categories">
          <div className="card-bahan-container">
            {kategori.map((x, index) => (
              <div key={index} className="card-resep">
                <div className="content">
                  <div className="image-container">
                    <img src={x.img ? `${BASE_URL}/${x.img}` : sotoImage} alt={x.recipe_title} />
                  </div>
                  <h4>{x.recipe_title}</h4>
                  <p>{x.deskripsi || "Hidangan yang terdiri dari irisan daging ayam yang dilumuri bumbu, kemudian diisi dengan campuran sayuran seperti wortel dan kacang polong."}</p>
                  <div className="rat">
                    <div className="rating">
                      <span>&#9733;</span>
                      <span>&#9733;</span>
                      <span>&#9733;</span>
                      <span>&#9733;</span>
                      <span>&#9733;</span>
                    </div>
                    <Link to={`/api/recipes/${x.id}`}><button>Masak</button></Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default ContainerKategori;
