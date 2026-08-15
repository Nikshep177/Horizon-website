import { Link } from 'react-router-dom'
import '../styles/hero.css'
import Galaxy from '../components/Galaxy/Galaxy'
import MagicBento from '../components/MagicBento/MagicBento'
import ShinyText from '../components/ShinyText/ShinyText'
import AboutUsCarousel from '../components/AboutUsCarousel'

export default function Home() {
  const whatWeDoCards = [
    <Link key="events" to="/events" className="feature-card feature-card--inner">
      <h3>Community Events</h3>
      <p>Student-led sessions, professor lecture series, stargazing nights and physics competitions that bring together curious minds and foster a vibrant scientific community.</p>
    </Link>,
    <Link key="projects" to="/projects" className="feature-card feature-card--inner">
      <h3>Club Projects</h3>
      <p>As a club, we work on a variety of innovative projects across physics and astronomy. Click here to explore our ongoing and completed projects.</p>
    </Link>,
    <Link key="astrophotography" to="/astrophotography" className="feature-card feature-card--inner">
      <h3>Astrophotgraphy</h3>
      <p>Our astronomy team captures the beauty of the night sky through hands-on astrophotography. Click here to view our work.</p>
    </Link>,
    <Link key="guild" to="/guild" className="feature-card feature-card--inner">
      <h3>Guild</h3>
      <p>Our Guild represents the club in various technical and scientific competitions. Click here to explore our achievements.</p>
    </Link>,
    <Link key="articles" to="/articles" className="feature-card feature-card--inner">
      <h3>Articles</h3>
      <p>Explore the articles written by our club members, covering topics in Physics, Astronomy and beyond. Click here to start reading them.</p>
    </Link>,
    <Link key="gallery" to="/team#gallery" className="feature-card feature-card--inner">
      <h3>Gallery</h3>
      <p>A collection of photographs capturing our star parties, trips, events, workshops, and other activities. Click here to explore the gallery.</p>
    </Link>,
  ]
  return (
    <>
      <div className="home-sections-wrapper">
        <div className="home-shared-background" aria-hidden="true">
          <Galaxy
            mouseInteraction={false}
            density={1.1}
            glowIntensity={0.4}
            saturation={0.65}
            hueShift={220}
            twinkleIntensity={0.35}
            rotationSpeed={0.04}
            starSpeed={0.4}
            speed={0.8}
            transparent={true}
          />
        </div>

        <section className="hero hero-astro">
          <div className="container hero-content">
            <h1><ShinyText text="Welcome to Horizon!" speed={3} color="#f2f0ff" shineColor="#ffffff" spread={150} /></h1>
            <p className="hero-tagline"><ShinyText text="The Physics and Astronomy Club, IIT Madras" speed={4} color="#c9cbe8" shineColor="#ffffff" spread={120} /></p>
            <div className="hero-actions">
              <Link to="/contact" className="year-pill">Contact Us</Link>
              <Link to="/articles" className="year-pill">Read Articles</Link>
            </div>
          </div>
        </section>

        <section className="section home-what-we-do">
          <div className="container what-we-do-content">
            <h2>What We Do</h2>
            <MagicBento
              containerClassName="features-grid"
              enableTilt
              enableMagnetism
              clickEffect={false}
              textAutoHide={false}
            >
              {whatWeDoCards}
            </MagicBento>
          </div>
        </section>
      </div>

      <AboutUsCarousel />
    </>
  )
}
