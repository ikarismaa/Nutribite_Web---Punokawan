import { useState } from 'react';
import grafikKalori from '/src/assets/grafikkalori.jpg'
import rincianKalori from '/src/assets/rinciankalori.jpg'

function hitungAKG(jenisKelamin, beratBadanKg, tinggiBadanCm, usiaTahun) {
  if (jenisKelamin === 'L') {
      return 88.362 + (13.397 * beratBadanKg) + (4.799 * tinggiBadanCm) - (5.677 * usiaTahun);
  } else if (jenisKelamin === 'P') {
      return 447.593 + (9.247 * beratBadanKg) + (3.098 * tinggiBadanCm) - (4.330 * usiaTahun);
  }
}

const ContainerHitungakg = () => {
        const [usia, setUsia] = useState(0);
        const [berat, setBerat] = useState(0);
        const [tinggi, setTinggi] = useState(0);
        const [jenisKelamin, setJenisKelamin] = useState('L');
      
        const handleSubmit = (event) => {
          event.preventDefault();
          const AKG = hitungAKG(jenisKelamin, berat, tinggi, usia);
          localStorage.setItem('akgData', AKG);
          window.location.href = '/hasilakg';
        }
  return (
    <>
    <section className="hitungakg" id="hitungakag">
      <div className="name-hitungakg">
        <h1>Hitung Angka Kecukupan Gizi (AKG)</h1>
      </div>
      <div className="des-hitung-akg">
        <div className="deskripsi-akg">
          <p>Perhitungan AKG disesuaikan sesuai dengan beberapa variabel individu, termasuk usia, berat badan, tinggi badan, dan jenis kelamin.</p>
          <center><img src={grafikKalori} alt="Logo" /></center>
          <center><p style={{ color: 'rgba(255, 0, 0, 0.769)' }}>*Berdasarkan AKG dari 2000 kalori</p></center>
          <p>Setelah AKG ditentukan, semua informasi mengenai makanan, pencatatan harian makanan, dan jadwal diet akan tersedia bersamaan dengan AKG tersebut dalam ingatan Anda.</p><br/>
          <center><img src={rincianKalori} alt="Logo" /></center>
          <center><p style={{ color: 'rgba(255, 0, 0, 0.769)' }}>*contoh</p></center>
          <p>Anda bisa memeriksa informasi rinci tentang kalori yang berasal dari lemak, karbohidrat, dan protein dalam makanan, bersama dengan catatan makanan dan jadwal diet. Hal ini bermanfaat bagi Anda yang ingin mengatur asupan gizi dengan lebih spesifik.</p><br/>
          <p>Anda dapat menyesuaikan AKG kapanpun diperlukan, dan kemajuan Anda akan dinilai berdasarkan AKG yang diperbarui di masa mendatang.</p>
        </div>
        <div className="hitung-akg-anda">
          <h2>Hitung AKG Anda</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="usia">Usia:</label>
              <input
                type="number"
                id="usia"
                placeholder="Masukkan usia"
                className="input-field"
                value={usia}
                onChange={(e) => setUsia(parseInt(e.target.value))}
              />
            </div>
            <div>
              <label htmlFor="berat">Berat Badan:</label>
              <input
                type="number"
                id="berat"
                placeholder="Masukkan berat badan"
                className="input-field"
                value={berat}
                onChange={(e) => setBerat(parseInt(e.target.value))}
              />
              <span className="unit"> kg</span>
            </div>
            <div>
              <label htmlFor="tinggi">Tinggi Badan:</label>
              <input
                type="number"
                id="tinggi"
                placeholder="Masukkan tinggi badan"
                className="input-field"
                value={tinggi}
                onChange={(e) => setTinggi(parseInt(e.target.value))}
              />
              <span className="unit"> cm</span>
            </div>
            <div className="page-jen-kel">
              <div className="jen-kel">
                <p>Jenis Kelamin:</p>
              </div>
              <div className="jenis-kelamin">
                <div className="radio-group">
                  <label htmlFor="L">
                    <input
                      type="radio"
                      id="L"
                      name="jenis-kelamin"
                      value="L"
                      checked="checked"
                      onChange={(e) => setJenisKelamin(e.target.value)}
                    /> Laki-laki
                  </label>
                  <label htmlFor="P">
                    <input
                      type="radio"
                      id="P"
                      name="jenis-kelamin"
                      value="P"
                      onChange={(e) => setJenisKelamin(e.target.value)}
                    /> Perempuan
                  </label>
                </div>
              </div>
            </div>
            
            <button type="submit" className="hitung-btn">
              Hitung AKG
            </button>
          </form>
        </div>
      </div>
    </section>
    </>
  )
}

export default ContainerHitungakg