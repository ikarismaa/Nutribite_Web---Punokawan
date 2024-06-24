import { Link } from 'react-router-dom'; // Jika menggunakan react-router-dom
import foodImage from '/src/assets/gambarGede.jpg'; 
import '../komponen/style.css'

const LupaPassword = () => {
  return (
    <>
    <div className="containerPass">
      <div className="reset-form">
        <h1>Reset Password</h1>
        <form>
          <div className="input-group-reset">
            <label htmlFor="passwordlama">Password Lama</label>
            <input type="password" id="passwordlama" placeholder="Password" required />
          </div>
          <div className="input-group-reset">
            <label htmlFor="passwordbaru">Password Baru</label>
            <input type="password" id="passwordbaru" placeholder="Password" required />
          </div>
          <div className="input-group-reset">
            <label htmlFor="konfirpassword">Konfirmasi Password Baru</label>
            <input type="password" id="konfirpassword" placeholder="Password" required />
          </div>
          <div className="buttons-container-reset">
          <button type="submit" className="cancel-button">
            <Link to="/login">Login</Link>
          </button>
          <button type="submit" className="reset-button">
            <Link to="/">reset</Link>
          </button>
          </div>
        </form>
      </div>
      <div className="side-image-pass">
        <img src={foodImage} alt="Food Image" />
      </div>
    </div>
    </>
  );
}

export default LupaPassword;
