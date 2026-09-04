import { useState } from 'react'
import { Link } from 'react-router-dom'
import { getArticles } from '../lib/content-loader'
import { astroGallery as gallery } from '../lib/site-data'
import { formatDate } from '../lib/format-date'
import Particles from '../components/Particles/Particles'
import Masonry from '../components/Masonry/Masonry'
import ImageModal from '../components/ImageModal/ImageModal'
import EquipmentInventory from '../components/EquipmentInventory'
import EmptyState from '../components/EmptyState'
import '../styles/events.css'
import './Astrophotography.css'

const masonryHeights = [380, 320, 420, 300, 360, 400, 340, 300, 420, 360, 320, 400]

export default function Astrophotography() {
  const astroPosts = getArticles().filter(a => a.tags?.includes('astrophotography'))
  const [selectedImage, setSelectedImage] = useState(null)

  const formattedAstroItems = gallery.map((item, i) => ({
    ...item,
    id: item.id,
    img: item.imageSrc,
    height: masonryHeights[i % masonryHeights.length]
  }))

  return (
    <article className="events-page astro-page">
      <div className="astro-particles-bg" aria-hidden="true">
        <Particles
          particleColors={['#ffffff', '#a6c8ff', '#5227ff']}
          particleCount={200}
          particleSpread={10}
          speed={0.1}
          particleBaseSize={100}
          moveParticlesOnHover={true}
          particleHoverFactor={3}
          alphaParticles={false}
          disableRotation={false}
        />
      </div>

      <div className="events-container">
        <header className="events-header">
          <h1 className="events-title">Astrophotography</h1>
          <p className="events-subtitle">Deep-sky imaging, star trails, and the cosmos through our lenses.</p>
        </header>

        <section className="astro-gallery-section">
          <div className="astro-gallery-content">
            <div className="astro-gallery-container">
              <h2 className="event-category__title astro-gallery-title">The Cosmic Gallery</h2>
              {formattedAstroItems.length > 0 ? (
                <Masonry
                  items={formattedAstroItems}
                  ease="power3.out"
                  duration={0.6}
                  stagger={0.05}
                  animateFrom="bottom"
                  scaleOnHover={true}
                  hoverScale={0.97}
                  blurToFocus={true}
                  onItemClick={item => setSelectedImage(item)}
                />
              ) : (
                <EmptyState message="No astrophotography images are available yet." />
              )}
            </div>

            <EquipmentInventory />

            {selectedImage && (
              <ImageModal
                image={selectedImage}
                onClose={() => setSelectedImage(null)}
              />
            )}

            {astroPosts.length > 0 && (
              <div className="astro-articles">
                <div className="container">
                  <h2 className="event-category__title astro-articles-title">Articles</h2>
                  <div className="articles-list">
                    {astroPosts.map(post => (
                      <article key={post.id} className="article-card">
                        <div className="card-body">
                          <div className="card-meta">
                            <span>{post.author}</span>
                            <span>{formatDate(post.date)}</span>
                          </div>
                          <h3 className="card-title">
                            <Link to={`/articles/${post.id}`}>{post.title}</Link>
                          </h3>
                          <Link to={`/articles/${post.id}`} className="read-link">
                            Read more <span className="arrow">&rarr;</span>
                          </Link>
                        </div>
                      </article>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      </div>
    </article>
  )
}
