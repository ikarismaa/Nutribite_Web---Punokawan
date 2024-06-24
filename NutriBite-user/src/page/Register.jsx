import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import googleIcon from '/src/assets/google.png';
import foodImage from '/src/assets/gambarGede.jpg';

const Register = () => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [notification, setNotification] = useState(null);
  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, username, email, password }),
      });

      const data = await response.json();

      if (data.success) {
        setNotification({ type: 'success', message: 'Registrasi berhasil' });
        navigate('/login');
      } else {
        setNotification({ type: 'error', message: 'Registrasi gagal: ' + data.message });
      }
    } catch (error) {
      console.error('Gagal melakukan registrasi:', error);
      setNotification({ type: 'error', message: 'Gagal melakukan registrasi' });
    }
  };

  return (
    <div className="containerLogin">
      <div className="Register-form">
        <h1>Register</h1>
        <button className="google-register">
          <img src={googleIcon} alt="Google" /> Sign in with Google
        </button>
        <div className="horizontal-line-register">
          <p>Atau, Daftar dengan email Anda</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="input-group-register">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="input-group-register">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="input-group-register">
            <label htmlFor="email">Email address</label>
            <input
              type="email"
              id="email"
              placeholder="example@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group-register">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="remember-me-register">
            <input type="checkbox" id="remember" />
            <label htmlFor="remember">Ingatkan saya</label>
          </div>
          <button type="submit" className="register-button">Register</button>
          {notification && (
            <div className={`notification ${notification.type}`}>
              {notification.message}
            </div>
          )}
          <div className="additional-options-register">
            <p>Sudah memiliki akun? <Link to="/login">Login</Link></p>
          </div>
        </form>
      </div>
      <div className="side-image">
        <img src={foodImage} alt="Food Image" />
      </div>
    </div>
  );
};

export default Register;
