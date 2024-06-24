import HerosUser from "../komponen/HerosUser";
import Navbar from "../komponen/Navbar";
import Footer from "../komponen/Footer";
import "../komponen/style.css";
import ArtikelUser from "../komponen/ArtikelUser";
import UserSimpan from "../komponen/UserSimpan";

const PageUserSimpan = () => {
  return (
    <>
      <Navbar />
      <HerosUser />
      <ArtikelUser />
      <UserSimpan />
      <Footer />
    </>
  );
};

export default PageUserSimpan;
