import { Link } from 'react-router-dom'
import { imagePath } from '../lib/image-path'
import ShootingStars from './ShootingStars'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="site-footer">
      <ShootingStars />
      <div className="container">
        <div className="footer-content">
          <div className="footer-section footer-brand">
            <a className="footer-logo">
              <img src={imagePath('/assets/images/logo.png')} alt="Horizon logo" />
            </a>
            <p>The Physics and Astronomy Club of IIT Madras</p>
          </div>

          <div className="footer-section">
            <h3>Quick Links</h3>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/team">Team</Link></li>
              <li><Link to="/events">Events</Link></li>
              <li><Link to="/qiskit">Qiskit</Link></li>
              <li><Link to="/articles">Articles</Link></li>
            </ul>
          </div>

          <div className="footer-section social">
            <h3>Connect</h3>
            <ul>
              <li>
                <a href="https://www.instagram.com/horizoniitm/">
                  <svg className="icon instagram" viewBox="0 0 24 24"><path d="M7 2C4.2 2 2 4.2 2 7v10c0 2.8 2.2 5 5 5h10c2.8 0 5-2.2 5-5V7c0-2.8-2.2-5-5-5H7zm10 2c1.7 0 3 1.3 3 3v10c0 1.7-1.3 3-3 3H7c-1.7 0-3-1.3-3-3V7c0-1.7 1.3-3 3-3h10zm-5 3a5 5 0 100 10 5 5 0 000-10zm0 2a3 3 0 110 6 3 3 0 010-6zm4.8-.6a1.2 1.2 0 11-2.4 0 1.2 1.2 0 012.4 0z" /></svg>
                  Instagram
                </a>
              </li>
              <li>
                <a href="mailto:horizon_cfi@smail.iitm.ac.in">
                  <svg className="icon email" viewBox="0 0 24 24"><path d="M4 4h16a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2zm8 7l8-5H4l8 5z" /></svg>
                  Email
                </a>
              </li>
              <li>
                <a href="https://www.youtube.com/@HorizonIITM">
                  <svg className="icon youtube" viewBox="0 0 24 24"><path d="M23.5 6.2a3 3 0 00-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6a3 3 0 00-2.1 2.1A31.7 31.7 0 000 12a31.7 31.7 0 00.5 5.8 3 3 0 002.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 002.1-2.1A31.7 31.7 0 0024 12a31.7 31.7 0 00-.5-5.8zM9.8 15.5v-7l6 3.5-6 3.5z" /></svg>
                  YouTube
                </a>
              </li>
              <li>
                <a href="https://www.linkedin.com/company/horizon-cfi-iitm/">
                  <svg className="icon linkedin" viewBox="0 0 24 24"><path d="M4.98 3.5a2.5 2.5 0 110 5 2.5 2.5 0 010-5zM3 9h4v12H3V9zm7 0h3.8v1.7h.1c.5-.9 1.7-1.9 3.6-1.9 3.9 0 4.6 2.6 4.6 6v6.2h-4v-5.5c0-1.3 0-3-1.9-3s-2.2 1.5-2.2 2.9v5.6H10V9z" /></svg>
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {year} Horizon. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
