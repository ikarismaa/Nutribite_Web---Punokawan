import { useEffect, useState } from 'react';
import './style.css';
import artikelImage from "/src/assets/artikel-1.jpg"
import { Link } from 'react-router-dom'
import axios from 'axios';

const BASE_URL = 'http://localhost:3000';

const ContainerArtikel = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [artikel, setArtikel] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      await axios.get('http://127.0.0.1:3000/api/artikelindex')
        .then(response => {
          console.log('Artikel:', response.data.data);
          setArtikel(response.data.data);
        })
        .catch(error => {
          console.error('Error fetching artikel:', error);
        });
    };
    fetchData();
  }, []);

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Lakukan sesuatu dengan searchQuery, seperti mengirimkan ke server atau melakukan pencarian
    console.log('Searching for:', searchQuery);
  };

  return (
    <>
    <section className="page-artikel">
      <div className="card-page-artikel">
        <h1>Artikel</h1>
        <h3>Nutrisi, Tips & Trik</h3>
        <form className="search-form-artikel" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Cari artikel..."
            name="search"
            value={searchQuery}
            onChange={handleInputChange}
          />
          <button type="submit">Cari</button>
        </form>
        <div className="card-row-artikel">
          {artikel.map((_, index) => (
            <div className="card-artikel" key={index}>
              <div className="card-content-artikel">
                <p>
                  <Link to={`/deskripsiartikel/${_.id}`} className="btn-artikel">
                    {_.judul}
                  </Link>
                </p>
              </div>
              <div className="card-image-artikel">
              <img src={_.img ? `${BASE_URL}/${_.img}` : artikelImage} alt={_.recipe_title} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
    </>
  )
}

export default ContainerArtikel