import SpaceBackground from '../components/SpaceBackground'
import PageHeader from '../components/PageHeader'
import ExternalLink from '../components/ExternalLink'
import '../styles/events.css'

export default function Contact() {
  return (
    <article className="page events-page contact-page">
      <SpaceBackground />
      <div className="events-container">
        <PageHeader title="Contact Us" />
        <div className="page-content">
          <h2>Get in Touch</h2>
          <p>We'd love to hear from you! Whether you're interested in joining the club, have questions about our events, or want to collaborate, feel free to reach out.</p>

          <h3>Email</h3>
          <p>
            <strong>General Inquiries:</strong>{' '}
            <a href="mailto:horizon_cfi@smail.iitm.ac.in">horizon_cfi@smail.iitm.ac.in</a>
          </p>

          <h3>Social Media</h3>
          <p>Stay updated with our latest events, articles, and announcements:</p>
          <ul>
            <li><strong>Instagram</strong>: <ExternalLink href="https://www.instagram.com/horizoniitm/">@HorizonIITM</ExternalLink></li>
            <li><strong>LinkedIn</strong>: <ExternalLink href="https://www.linkedin.com/company/horizon-cfi-iitm/">Horizon CFI IITM</ExternalLink></li>
            <li><strong>YouTube</strong>: <ExternalLink href="https://www.youtube.com/@HorizonIITM">@HorizonIITM</ExternalLink></li>
          </ul>

          <h3>Address</h3>
          <p>Centre for Innovation, Indian Institute Of Technology, Chennai, Tamil Nadu 600036</p>
        </div>
      </div>
    </article>
  )
}
