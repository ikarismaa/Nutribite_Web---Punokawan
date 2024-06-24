import Beranda from "./page/Beranda";
import Bahan from "./page/Bahan";
import HitungAkg from "./page/HitungAkg";
import Artikel from "./page/Artikel";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DeskripsiResep from "./page/DeskripsiResep";
import CariBahan from "./page/CariBahan";
import HasilAkg from "./page/HasilAkg";
import DeskripsiArtikel from "./page/DeskripsiArtikel";
import Login from "./page/Login";
import Register from "./page/Register";
import LupaPassword from "./page/LupaPassword";
import Kategori from "./page/Kategori";
import PageBuatArtikel from "./page/PageBuatArtikel";
import PageProfile from "./page/PageProfile";
import PageUserSimpan from "./page/PageUserSimpan";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<Beranda />} />
          <Route exact path="/bahan" element={<Bahan />} />
          <Route exact path="/hitungakg" element={<HitungAkg />} />
          <Route exact path="/artikel" element={<Artikel />} />
          <Route exact path="/deskripsiartikel/:id" element={<DeskripsiArtikel />} />
          <Route exact path="/api/recipes/:id" element={<DeskripsiResep />} />
          <Route exact path="/caribahan" element={<CariBahan />} />
          <Route exact path="/hasilakg" element={<HasilAkg />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/lupapassword" element={<LupaPassword />} />
          <Route exact path="/kategori" element={<Kategori />} />
          <Route exact path="/buatartikel" element={<PageBuatArtikel />} />
          <Route exact path="/profile" element={<PageProfile />} />
          <Route exact path="/usersimpan" element={<PageUserSimpan />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
