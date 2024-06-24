import logoBawah from '/logoBawah.png'
import './style.css'

const Footer = () => {
  return (
   <>
   {/* footer */}
   <footer>
    <div className="top-footer">
    <img src={logoBawah} alt="Logo" />
    </div>
    <div className="footer-p">
        <p>Setiap gigitan merupakan petualangan rasa yang seru dan menyehatkan, karena </p>
        <p>mengandung nutrisi berkualitas yang memberikan kekuatan bagi jiwa dan raga.</p>
    </div>
    <div className="footer-social-icons">
                <a href="https://www.instagram.com/gtaprtwi_/"  target="_blank"><div className="icon"><i className="uil-twitter-alt"></i></div></a>
                <a href="https://www.linkedin.com/in/gitapratiw/"  target="_blank"><div className="icon"><i className="uil-facebook-f"></i></div></a>
                <a href="https://www.github.com/gitapratiwi10/"  target="_blank"><div className="icon"><i className="uil uil-instagram"></i></div></a>
                <a href="https://www.github.com/gitapratiwi10/"  target="_blank"><div className="icon"><i className="uil uil-github-alt"></i></div></a>
    </div>
    <div className="horizontal-line"></div>
    <div className="bottom-footer">
        <p>&copy; Copyright 2024, All rights reserved by<a href="#home" style={{textDecoration: 'none', color: 'inherit'}}> NutriBite</a></p>
    </div>
</footer>

{/* <script src="https://unpkg.com/typed.js@2.0.16/dist/typed.umd.js"></script>

<script src="https://unpkg.com/scrollreveal"></script> */}
   
   </>
  )
}

export default Footer