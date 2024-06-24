import gambarCabai from '/src/assets/cabai.png'
import gambarTempe from '/src/assets/tempe.png'
import gambarTahu from '/src/assets/tahu.png'
import gambarSawi from '/src/assets/sawi.png'
import gambarTelur from '/src/assets/telur.png'
import gambarSosia from '/src/assets/sosis.png'
import gambarWortel from '/src/assets/wortel.png'
import gambarKentang from '/src/assets/kentang.png'
import gambarKangkung from '/src/assets/kangkung.png'
import './style.css'


const BahanIndex = () => {
  return (
    <>
    <section className="section" id="bahan">
        <div className="name-bahan">
            <div className="name-bahan-2"><h1>Bahan</h1></div>
        </div>
        <div className="grid-container-bahan">
            <div className="kat-bahan">
                <img src={gambarTempe} alt="Logo" />
                <h3>Tempe</h3>
            </div>
            <div className="kat-bahan">
            <img src={gambarSawi} alt="Logo" />
                <h3>Sawi</h3>
            </div>
            <div className="kat-bahan">
            <img src={gambarTelur} alt="Logo" />
                <h3>Telur</h3>
            </div>
            <div className="kat-bahan">
            <img src={gambarCabai} alt="Logo" />
                <h3>Cabai</h3>
            </div>
            <div className="kat-bahan">
            <img src={gambarTahu} alt="Logo" />
                <h3>Tahu</h3>
            </div>
        </div>
        <div className="grid-container-bahan">
            <div className="kat-bahan">
            <img src={gambarKentang} alt="Logo" />
                <h3>Kentang</h3>
            </div>
            <div className="kat-bahan">
            <img src={gambarWortel} alt="Logo" />
                <h3>Wortel</h3>
            </div>
            <div className="kat-bahan">
            <img src={gambarSosia} alt="Logo" />
                <h3>Sosis</h3>
            </div>
            <div className="kat-bahan">
            <img src={gambarKangkung} alt="Logo" />
                <h3>Kangkung</h3>
            </div>
        </div>
    </section>
    </>
  )
}

export default BahanIndex