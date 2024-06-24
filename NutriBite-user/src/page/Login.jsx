import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import googleIcon from "/src/assets/google.png";
import foodImage from "/src/assets/gambarGede.jpg";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.success) {
        localStorage.setItem("authToken", data.token); // Simpan token di localStorage
        navigate("/");
        alert("Login berhasil");
      } else {
        alert("Login gagal: " + data.message);
      }
    } catch (error) {
      console.error("Gagal melakukan login:", error);
      alert("Gagal melakukan login");
    }
  };

  return (
    <>
      <div className="containerLogin">
        <div className="login-form">
          <h1>Login</h1>
          <button className="google-login">
            <img src={googleIcon} alt="Google" /> Sign in with Google
          </button>
          <div className="horizontal-line-login">
            <p>Atau, Masuk dengan email Anda</p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="email">Email address</label>
              <input type="email" id="email" placeholder="example@gmail.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input type="password" id="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <button type="submit" className="login-button">
              Login
            </button>
            <div className="additional-options">
              <p>
                Dont have an account? <Link to="/register">Membuat akun gratis</Link>
              </p>
              <p>
                <Link to="/lupapassword">Lupa password?</Link>
              </p>
            </div>
          </form>
        </div>
        <div className="side-image">
          <img src={foodImage} alt="Food Image" />
        </div>
      </div>
    </>
  );
};

export default Login;
