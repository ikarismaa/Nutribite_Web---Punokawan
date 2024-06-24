import { Link } from 'react-router-dom'
import gambarSoto from '/src/assets/soto.jpg'
import { useState, useEffect } from 'react'
import axios from 'axios'


const UserSuka = () => {
  const [loveFoods, setLoveFoods] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:3000/api/users/current/fav-food', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
          }
        });

        console.log('Saved foods:', response.data.favFoods);
        setLoveFoods(response.data.favFoods);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
        <section className="konten">
        <div className="header-konten">
            <div className="tab active">
                <Link to="/profile"><i className="fas fa-heart"></i> Suka</Link>
            </div>
            <div className="tab">
                <Link to="/usersimpan"><i className="fas fa-bookmark"></i> Tersimpan</Link>
            </div>
        </div>
        <div className="card-resep-container">
          {loveFoods.map(recipe => (
            <div key={recipe.id} className="card-resep">
              <div className="content">
                <div className="image-container">
                  <img src={recipe.img ? `http://127.0.0.1:3000/${recipe.img}` : gambarSoto} alt={recipe.recipe_title} />
                  <div className="icon-love" style={{display: 'none'}}>{recipe.is_favorite ? '❤️' : '🤍'}</div>
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
                  <Link to={`/api/recipes/${recipe.id}`}><button>Masakan</button></Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        </section>
    </>

  );
}

export default UserSuka;
