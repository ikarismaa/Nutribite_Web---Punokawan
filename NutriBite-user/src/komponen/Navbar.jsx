import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logoAtas from "/logoAtas.png";
import "./style.css";

const Navbar = () => {
  const location = useLocation();
  const [activeLink, setActiveLink] = useState(location.pathname);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [profile, setProfile] = useState("");
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check login status from localStorage when the component mounts
    const token = localStorage.getItem("authToken");
    setIsLoggedIn(!!token);

    // Fetch user profile from /api/users/current
    function fetchProfile() {
      fetch("http://localhost:3000/api/users/current", {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((data) => {
          setProfile(data.user.profil_pic);
        })
        .catch((err) => console.error("Error fetching profile:", err));
    }

    fetchProfile();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const header = document.getElementById("header");
      if (window.scrollY > 50) {
        header.classList.add("header-shadow");
      } else {
        header.classList.remove("header-shadow");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleLinkClick = (path) => {
    setActiveLink(path);
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setIsLoggedIn(false);
    setShowProfileMenu(false); // Hide profile menu on logout
    navigate("/");
  };

  const toggleProfileMenu = () => {
    setShowProfileMenu(!showProfileMenu);
  };

  const myMenuFunction = () => {
    const menuBtn = document.getElementById("myNavMenu");
    if (menuBtn.className === "nav-menu") {
      menuBtn.className += " responsive";
    } else {
      menuBtn.className = "nav-menu";
    }
  };

  const handleProtectedRouteClick = (path) => {
    if (isLoggedIn) {
      handleLinkClick(path);
      navigate(path);
    } else {
      setShowLoginPopup(true);
    }
  };

  const closePopup = () => {
    setShowLoginPopup(false);
  };

  return (
    <nav id="header">
      <div className="nav-logo">
        <Link to="/beranda">
          <img src={logoAtas} alt="Logo" />
        </Link>
      </div>
      <div className="nav-menu" id="myNavMenu">
        <ul className="nav_menu_list">
          <li className="nav_list">
            <Link to="/" className={`nav-link ${activeLink === "/" ? "active-link" : ""}`} onClick={() => handleLinkClick("/")}>
              Beranda
            </Link>
            <div className="circle"></div>
          </li>
          <li className="nav_list">
            <Link to="/bahan" className={`nav-link ${activeLink === "/bahan" ? "active-link" : ""}`} onClick={() => handleLinkClick("/bahan")}>
              Bahan
            </Link>
            <div className="circle"></div>
          </li>
          <li className="nav_list">
            <span className={`nav-link ${activeLink === "/hitungakg" ? "active-link" : ""}`} onClick={() => handleProtectedRouteClick("/hitungakg")}>
              Hitung AKG
            </span>
            <div className="circle"></div>
          </li>
          <li className="nav_list">
            <Link to="/artikel" className={`nav-link ${activeLink === "/artikel" ? "active-link" : ""}`} onClick={() => handleLinkClick("/artikel")}>
              Artikel
            </Link>
            <div className="circle"></div>
          </li>
        </ul>
      </div>
      {isLoggedIn ? (
        <div className="profile-container">
          <div className="profil-icon" onClick={toggleProfileMenu} style={{ fontSize: "initial" }}>
            <img width={48} height={48} src={profile} alt="Profile" style={{ borderRadius: "50%" }} />
          </div>
          {showProfileMenu && (
            <div className="profile-menu">
              <Link to="/profile" onClick={() => setShowProfileMenu(false)}>
                Profil
              </Link>
              <button onClick={handleLogout}>Logout</button>
            </div>
          )}
        </div>
      ) : (
        <div className="nav-button">
          <Link to="/login" className="btn">
            Masuk <i className="uil uil-import"></i>
          </Link>
        </div>
      )}
      <div className="nav-menu-btn">
        <i className="uil uil-bars" onClick={myMenuFunction}></i>
      </div>

      {showLoginPopup && (
        <div className="popup-overlay">
          <div className="popup">
            <h2>Anda belum login</h2>
            <p>Silakan login terlebih dahulu untuk mengakses halaman Hitung AKG.</p>
            <button onClick={() => navigate("/login")}>Login</button>
            <button onClick={closePopup}>Tutup</button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
