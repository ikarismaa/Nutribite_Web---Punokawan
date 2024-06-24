import { useEffect, useRef, useState } from 'react';
import Typed from 'typed.js';
import './style.css';
import { useNavigate } from 'react-router-dom';

const Heros = () => {
  const typedElement = useRef(null);
  const navigate = useNavigate();
  const [showLoginPopup, setShowLoginPopup] = useState(false);

  useEffect(() => {
    if (typedElement.current) {
      const options = {
        strings: ["Tingkatkan Kesehatan Anda dengan Nutribite, Setiap Gigitan Penuh Nutrisi!"],
        typeSpeed: 50,
        backSpeed: 50,
        backDelay: 2000,
        loop: true,
      };

      const typed = new Typed(typedElement.current, options);

      return () => {
        typed.destroy();
      };
    }
  }, []);

  const handleProtectedRouteClick = (path) => {
    const isLoggedIn = sessionStorage.getItem('isLoggedIn'); // or localStorage.getItem('isLoggedIn')
    if (isLoggedIn) {
      navigate(path);
    } else {
      setShowLoginPopup(true);
    }
  };

  const closePopup = () => {
    setShowLoginPopup(false);
  };

  return (
    <>
      <section className="featured-box" id="home">
        <div className="slogan">
          <span className="typedText" ref={typedElement}></span>
        </div>
        <div className="slogan-2">
          <p>Mari hitung Angka Kecukupan Gizi (AKG) dan nikmati resep rekomendasinya dari AKG anda!</p>
        </div>
        <div className="nav-button-heros">
          <button  onClick={() => handleProtectedRouteClick("/hitungakg")} className="btn-heros">
            Hitung AKG
          </button>
        </div>
      </section>

      {showLoginPopup && (
        <div className="popup-overlay">
          <div className="popup">
            <h2>Anda belum login</h2>
            <p>Silakan login terlebih dahulu untuk mengakses halaman Hitung AKG.</p>
            <button onClick={() => navigate('/login')}>Login</button>
            <button onClick={closePopup}>Tutup</button>
          </div>
        </div>
      )}
    </>
  );
};

export default Heros;
