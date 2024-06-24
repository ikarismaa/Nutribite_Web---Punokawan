import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Import useParams
import './style.css';
import axios from 'axios';
import sotoImage from '../assets/soto.jpg';  // Sesuaikan path sesuai struktur proyek Anda
import { toast } from 'react-toastify';
import kringKringSound from '../assets/kringKringSound.mp3';  // Import file audio

const BASE_URL = 'http://localhost:3000'; // Adjust based on your backend server URL

const ContainerDeskripsiResep = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [ingridient, setIngridient] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [hours, setHours] = useState('00');
  const [minutes, setMinutes] = useState('00');
  const [seconds, setSeconds] = useState('00');
  const [isRunning, setIsRunning] = useState(false);
  const [intervalId, setIntervalId] = useState(null);

  const getIngridient = () => {
    axios.get(`${BASE_URL}/api/recipes/ingridient/${id}`)
      .then(response => {
        console.log('s', response.data)
        setIngridient(response.data);
      })
      .catch(error => {
        console.error('Error fetching recipe:', error);
      });
  }

  useEffect(() => {
    setLoading(true);
    getIngridient();
    axios.get(`${BASE_URL}/api/recipes/${id}`)
      .then(response => {
        setRecipe(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching recipe:', error);
        setError(true);
        setLoading(false);
      });
  }, [id]);

  useEffect(() => {
    let interval = null;

    if (isRunning) {
      interval = setInterval(() => {
        setSeconds(prevSeconds => {
          const currentSeconds = parseInt(prevSeconds, 10);
          if (currentSeconds === 0) {
            if (minutes === '00' && hours === '00') {
              clearInterval(interval);
              setIsRunning(false);
              playSound();
              alert("Waktu habis!");
              return '00';
            }
            if (minutes === '00') {
              setHours(prevHours => String(parseInt(prevHours, 10) - 1).padStart(2, '0'));
              setMinutes('59');
              return '59';
            }
            setMinutes(prevMinutes => String(parseInt(prevMinutes, 10) - 1).padStart(2, '0'));
            return '59';
          }
          return String(currentSeconds - 1).padStart(2, '0');
        });
      }, 1000);
      setIntervalId(interval);
    } else if (!isRunning && intervalId) {
      clearInterval(intervalId);
    }

    return () => clearInterval(interval);
  }, [isRunning, hours, minutes]);

  const playSound = () => {
    const audio = new Audio(kringKringSound);
    audio.play();
  };

  const handleSaveFood = (foodId = id) => {
    try{
      axios.post(`${BASE_URL}/api/users/current/saved-food`,
        { foodId: foodId}, 
        {headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` }
      })
      .then(response => {
        console.log('Food saved successfully:', response.data);
        toast.success('Food added to bookmarks!');
      })
      .catch(error => {
        console.error('Error saving food:', error);
        if (error.response) {
          // Server responded with a non-2xx status code
          const errorMessage = error.response.data.message; // Assuming the API returns error messages in a 'message' field
          toast.error(`Failed to add food to bookmarks: ${errorMessage}`);
        }
      });
    }catch(error){
      console.error('Error fetching data:', error.message);
    }
  };

  const handleLoveFood = (foodId = id) => {
    try{
      axios.post(`${BASE_URL}/api/users/current/fav-food`,
        { foodId: foodId}, 
        {headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` }
      })
      .then(response => {
        console.log('Food added to favorites:', response.data);
        toast.success('Food added to favorites!');
      })
      .catch(error => {
        console.error('Error saving food:', error);
        if (error.response) {
          // Server responded with a non-2xx status code
          const errorMessage = error.response.data.message; // Assuming the API returns error messages in a 'message' field
          toast.error(`Failed to add food to favorites: ${errorMessage}`);
        }
      });
    }catch(error){
      console.error('Error fetching data:', error.message);
    }
  };


  const handleStart = () => {
    setIsRunning(true);
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setHours('00');
    setMinutes('00');
    setSeconds('00');
  };

  const handleTimeChange = (setter) => (e) => {
    setter(String(parseInt(e.target.value, 10)).padStart(2, '0'));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching recipe. Please try again later.</div>;
  }

  if (!recipe) {
    return <div>No recipe found.</div>;
  }

  return (
    <div>
      <div className="name-makanan">
        <h1>{recipe.recipe_title}</h1>
      </div>

      <section className="deskripsi">
        <div className="deskripsi-2">
          <div className="img-des">
            <img src={recipe.img ? `${BASE_URL}/${recipe.img}` : sotoImage} alt="Recipe" />
          </div>
          <div className="des-teks">
            <h2>Deskripsi</h2>
            <p>{recipe.deskripsi}</p>
            <h3>Porsi untuk {recipe.servings} orang</h3>
            <div className="rat-des">
              <div className="rating-des">
                <span>&#9733;</span>
                <span>&#9733;</span>
                <span>&#9733;</span>
                <span>&#9733;</span>
                <span>&#9733;</span>
              </div>
            </div>
            <div className="icon-simpan-love">
              <i title="Add to Bookmark" onClick={() => handleSaveFood()} className="fas fa-bookmark"></i>
              <i title="Add to Favorite" onClick={() => handleLoveFood()} className="fas fa-heart"></i>
            </div>
          </div>
        </div>
      </section>

      <section className="langkah">
        <div className="langkah-1">
          <div className="langkah-2">
            <div className="bahan-utama">
              <h2>Bahan Utama</h2>
              <div className="ingredient-list">
                {ingridient.map((x, index) => (
                  <div key={index} className="ingredient-item">
                    <span className="ingredient-name">- {x.ingredient_name}</span>
                    <span className="ingredient-qty">{x.max_qty}</span>
                    <span className="ingredient-unit">{x.unit}</span>
                  </div>
                ))}
              </div>

              <h2>Langkah-langkah</h2>
              <div dangerouslySetInnerHTML={{ __html: recipe.directions }} />
            </div>
          </div>
          <div className="gizi-timer">
          <div className="timer-gizi">
              <div className="timer">
                <h2>Timer</h2>
                <div className="time-display">
                  <input type="number" value={hours} onChange={handleTimeChange(setHours)} min="0" className="hidden-input" />:
                  <input type="number" value={minutes} onChange={handleTimeChange(setMinutes)} min="0" max="59" className="hidden-input" />:
                  <input type="number" value={seconds} onChange={handleTimeChange(setSeconds)} min="0" max="59" className="hidden-input" />
                </div>
                <button id="reset-button" onClick={handleReset}>Setel Ulang</button>
                <div className="icon-buttons">
                  <i className="uil uil-play" onClick={handleStart}></i>
                  <i className="uil uil-pause" onClick={handlePause}></i>
                  <i className="uil uil-plus-circle"></i>
                </div>
              </div>
            </div>
            <div className="timer-gizi-2">
              <div className="gizi">
                <h2>Informasi nilai gizi per porsi</h2>
                <div className="gizi-info">
                  <div className="gizi-item">
                    <h4>Kalori</h4>
                    <p id="kalori">{recipe.calories} kkal</p>
                  </div>
                  <div className="gizi-item">
                    <h4>Karbohidrat</h4>
                    <p id="karbohidrat">{recipe.carbo} g</p>
                  </div>
                  <div className="gizi-item">
                    <h4>Protein</h4>
                    <p id="protein">{recipe.protein} g</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="informasi">
        <div className="infor-penting">
          <h3>INFORMASI PENTING</h3>
          <p>
            *Estimasi nilai gizi bisa berubah tergantung pada jenis bahan dan cara memasaknya. <br />
            *Perhatikan variasi tersebut, terutama berdasarkan merek atau jenis bahan yang digunakan. <br />
            *Pastikan mengikuti instruksi pada resep untuk menghindari pengurangan Nutrisi pada makanan.
          </p>
        </div>
      </section>
    </div>
  );
};

export default ContainerDeskripsiResep;
