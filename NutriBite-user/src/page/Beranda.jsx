import { useEffect } from 'react';
import ScrollReveal from 'scrollreveal';
import Navbar from '../komponen/Navbar'
import Heros from '../komponen/Heros'
import KategoriIndex from '../komponen/KategoriIndex'
import ResepIndex from '../komponen/ResepIndex'
import ArtikelIndex from '../komponen/ArtikelIndex'
import Footer from '../komponen/Footer'
import BahanIndex from '../komponen/BahanIndex'



const Beranda = () => {
  useEffect(() => {
    const sr = ScrollReveal({
      origin: 'top',
      distance: '80px',
      duration: 2000,
      reset: true,
    });

    sr.reveal('.section', { delay: 200 });
  }, []); 
  return (
    <>
    <Navbar />
    <Heros />
    <KategoriIndex />
    <ResepIndex />
    <ArtikelIndex />
    <BahanIndex />
    <Footer />
    </>
  )
}

export default Beranda