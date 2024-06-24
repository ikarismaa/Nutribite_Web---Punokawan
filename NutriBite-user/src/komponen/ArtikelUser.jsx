import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const ArtikelUser = () => {
  const [artikel, setArtikel] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/users/artikel", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      })
      .then((response) => {
        console.log("Response:", response.data);
        setArtikel(response.data);
      })
      .catch((error) => {
        console.error("Error fetching articles:", error);
      });
  }, []);

  console.log(artikel);

  return (
    <section className="artikel-saya">
      <div className="header-artikel-saya">
        <h2>Artikel Saya</h2>
        <Link to="/buatartikel" className="buat-artikel">
          <i className="fas fa-plus"></i> Buat Artikel
        </Link>
      </div>
      <div className="artikel-container-user">
        {artikel.message
          ? artikel.message
          : artikel.map((artikel) => {
              return (
                <div className="artikel-user" key={artikel.id}>
                  <img src={`http://localhost:3000/${artikel.img}`} alt={artikel.judul} className="artikel-gambar" />
                  <div className="artikel-deskripsi">
                    <p>{artikel.judul}</p>
                  </div>
                </div>
              );
            })}
      </div>
    </section>
  );
};

export default ArtikelUser;
