import PropTypes from 'prop-types';
import './style.css'
import sotoImage from '/src/assets/soto.jpg'; // Pastikan path gambar benar
import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const RecipeCard = ({ image, title, description, direction }) => {

  async function handleViewResep(title,directions) {
    await axios.post(`http://127.0.0.1:3000/api/recipes/searchrecipes`, {
      recipeTitle: title,
      directions: directions
    }).then((response) => {
      if (response.data.length > 0) {
        const id = response.data[0].id;
        window.location.href = `/api/recipes/${id}`;
      } else {
        alert('Resep tidak ditemukan');
      }
    }).catch((error) => {
      console.error(error);
      toast.error('Terjadi kesalahan saat mengambil data resep');
    });
  }

  return (
    <div className="card-resep">
      <div className="content">
        <div className="image-container">
          <img src={image} alt={title} />
        </div>
        <h4>{title}</h4>
        <p>{description}</p>
        <div className="rat">
          <div className="rating">
            <span>&#9733;</span>
            <span>&#9733;</span>
            <span>&#9733;</span>
            <span>&#9733;</span>
            <span>&#9733;</span>
          </div>
          <button className="btn" onClick={() => handleViewResep(title,direction)}>Masak</button>
        </div>
      </div>
    </div>
  );
};

RecipeCard.propTypes = {
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    direction: PropTypes.string.isRequired
  };

const ContainerHasilakg = () => {
  const [recipes, setRecipes] = useState([]);

  const capitalizeWords = (str) => {
    return str.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  // Check apakah data sudah tersimpan di localStorage
  const dataAkg = localStorage.getItem('akgData');
  if (dataAkg === null) {
    window.location.href = '/hitungakg';
  }

  useEffect(() => {
    axios.post('http://localhost:3000/api/food-recommend', { calories: parseInt(dataAkg) })
      .then((response) => {
        setRecipes(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [dataAkg]);


  return (
    <>
      <section className="hasilakg">
        <div className="name-hitungakg">
          <h1>Hitung Angka Kecukupan Gizi (AKG)</h1>
        </div>
        <div className="des-hasil-akg">
          <div className="name-hasil">
            <h3>Hasil</h3>
          </div>
          <div className="deskripsi-hasil-akg">
            <div className="name-angka">
              <h3>Angka Kecukupan Gizi Anda adalah</h3>
            </div>
            <div className="name-kalori">
              <div className="result-kalori">
                <p>{Math.round(dataAkg)}</p>
              </div>
              <div className="kalori-hari">
                <p>Kalori<br />per hari</p>
              </div>
            </div>
            <div className="des-kalori">
              <p>*Ini merupakan hasil perkiraan kalori Angka Kecukupan Gizi (AKG) <br />
                Anda berdasarkan usia, berat badan, tinggi badan, dan jenis kelamin*</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="Resep">
        <div className="resep">
          <div className="name-resep">
            <h1>Rekomendasi anda sukai</h1>
          </div>
          <div className="card-resep-container">
            {recipes.map((recipe, index) => (
              <RecipeCard 
                key={index}
                image={recipe.img || sotoImage}
                title={ capitalizeWords(recipe.recipe_title) || 'Soto'}
                description={recipe.intro || ''}
                direction={recipe.intro || 'null'}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default ContainerHasilakg;
