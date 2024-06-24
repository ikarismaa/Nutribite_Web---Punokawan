import { useEffect, useState } from 'react';
import axios from 'axios';
import gambarSoto from '/src/assets/soto.jpg';
import './style.css';
import { Link } from 'react-router-dom';

const BASE_URL = 'http://localhost:3000'; // Ganti sesuai dengan URL server backend Anda

const ResepIndex = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    axios.get(`${BASE_URL}/api/recipes`)
      .then(response => {
        const data = response.data.data;
        setRecipes(data);
      })
      .catch(error => {
        if (error.response) {
          // The request was made and the server responded with a status code
          console.error('Server responded with a non-2xx status:', error.response.status);
          console.error('Error message:', error.response.data.message); // Adjust this based on your backend response structure
        } else if (error.request) {
          // The request was made but no response was received
          console.error('No response received:', error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.error('Error setting up the request:', error.message);
        }
      });
  }, []);
  

  return (
    <section className="section" id="Resep">
      <div className="resep">
        <div className="name-resep">
          <h1>Resep Terbaru</h1>
        </div>
        <div className="card-resep-container">
          {recipes.map(recipe => (
            <div key={recipe.id} className="card-resep">
              <div className="content">
                <div className="image-container">
                  <img src={recipe.img ? `${BASE_URL}/${recipe.img}` : gambarSoto} alt={recipe.recipe_title} />
                </div>
                <h4>{recipe.recipe_title}</h4>
                <p>{recipe.deskripsi || "Hidangan yang terdiri dari irisan daging ayam yang dilumuri bumbu, kemudian diisi dengan campuran sayuran seperti wortel dan kacang polong."}</p>
                <div className="rat">
                  <div className="rating">
                    <span>&#9733;</span>
                    <span>&#9733;</span>
                    <span>&#9733;</span>
                    <span>&#9733;</span>
                    <span>&#9733;</span>
                  </div>
                  <Link to={`/api/recipes/${recipe.id}`}><button>Masak</button></Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ResepIndex;
