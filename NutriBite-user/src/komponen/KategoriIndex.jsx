import gambarAyam from '/src/assets/ayam.jpg'
import gambarSayuran from '/src/assets/sayuran.jpg'
import gambarSapi from '/src/assets/sapi.jpg'
import gambarMakananLaut from '/src/assets/udang.jpg'
import gambarPasta from '/src/assets/pasta.jpg'
import './style.css'
import { Link} from 'react-router-dom'

const KategoriIndex = () => {
  return (
    <>
    <section className="section" id="kategori">
    
    <div className="grid-container">
        <div className="kat">
            <h3>Pilih Kategori yang di inginkan</h3>
            <p>Temukan beragam resep makanan mulai </p>
            <p>kategori daging,ikan, sayuran, hingga pasta</p>  
            <p>hidangan utama yang lezat dan bergizi.</p>
        </div>
        <div className="scroll-container">
            <div className="name-kat">
                <div className="name"><h3>Kategori</h3></div>
            </div>
            <div className="kategori">
                <div className="kat-bg">
                <Link to="/kategori?nama=ayam"><img src={gambarAyam} alt="Logo" />
                    <h3>Ayam</h3></Link>
                </div>
                <div className="kat-bg">
                <Link to="/kategori?nama=sayuran"><img src={gambarSayuran} alt="Logo" />
                    <h3>Sayuran</h3></Link>
                </div>
                <div className="kat-bg">
                <Link to="/kategori?nama=sapi"><img src={gambarSapi} alt="Logo" />
                    <h3>Sapi</h3></Link>
                </div>
                <div className="kat-bg">
                <Link to="/kategori?nama=makanan-laut"><img src={gambarMakananLaut} alt="Logo" />
                    <h3>Makanan Luat</h3></Link>
                </div>
                <div className="kat-bg">
                <Link to="/kategori?nama=pasta"><img src={gambarPasta} alt="Logo" />
                    <h3>Pasta</h3></Link>
                </div>
            </div>
        </div>
    </div>
</section>

</>
  )
}

export default KategoriIndex