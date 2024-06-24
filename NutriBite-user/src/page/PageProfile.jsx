import HerosUser from "../komponen/HerosUser";
import Navbar from "../komponen/Navbar";
import Footer from "../komponen/Footer";
import "../komponen/style.css";
import ArtikelUser from "../komponen/ArtikelUser";
import UserSuka from "../komponen/UserSuka";

const PageProfile = () => {
  return (
    <>
      <Navbar />
      <HerosUser />
      <ArtikelUser />
      <UserSuka />
      <Footer />
    </>
  );
};

export default PageProfile;
