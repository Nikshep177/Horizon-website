import { useState, useEffect, useRef } from 'react'
import teamData from '../data/team.json'
import SpaceBackground from '../components/SpaceBackground'
import GalleryRow from '../components/GalleryRow'
import { imagePath, normalizeAssetPaths } from '../lib/image-path'
import '../styles/events.css'

const normalizedTeamData = normalizeAssetPaths(teamData)
const tenures = Object.keys(normalizedTeamData).sort()
const sectionLabel = { core: 'Core Team', coordinator: 'Coordinators' }

const imageMap = {
  'Nantha Kumaran': '/assets/images-of-team-members/nantha.jpeg',
  'Harsh Meena': '/assets/images-of-team-members/harsh.jpeg',
  'Nikshep DC': '/assets/images-of-team-members/Nikshep.jpeg',
  'Ananya Desle': '/assets/images-of-team-members/andy.jpeg',
  'Aditya Goel': '/assets/images-of-team-members/aditya.jpeg',
  'Nikhil Kanakam': '/assets/images-of-team-members/Nikhil Kanakam.jpg',
  'Mirudhula': '/assets/images-of-team-members/Mirudhula.jpg',
  'Toshith': '/assets/images-of-team-members/Toshith.jpeg',
  'Lekhashree': '/assets/images-of-team-members/lekhashree.jpeg',
  'Rohit': '/assets/images-of-team-members/Rohith.jpeg',
  'Shruti': '/assets/images-of-team-members/Shruthi.jpeg',
  'G Sathvik': '/assets/images-of-team-members/coordinators_26_27/sathvik.jpeg',
  'Ranesh Mohan': '/assets/images-of-team-members/coordinators_26_27/ranesh.jpeg',
  'S Rajeev Yuvan': '/assets/images-of-team-members/coordinators_26_27/rajeev.jpeg',
  'Sankeerthan Krishna P': '/assets/images-of-team-members/coordinators_26_27/sankeerth.jpeg',
  'J Olive Jerusha': '/assets/images-of-team-members/coordinators_26_27/olive jerusha.jpeg',
  'Akshay KC': '/assets/images-of-team-members/coordinators_26_27/akshay kc.jpeg',
  'V. Thiruselvi': '/assets/images-of-team-members/coordinators_26_27/thiruselvi.jpeg',
  'Gawthaman A': '/assets/images-of-team-members/coordinators_26_27/gawthaman.jpeg',
  'Rohit S': '/assets/images-of-team-members/coordinators_26_27/rohit.jpeg',
  'Keerthana': '/assets/images-of-team-members/coordinators_26_27/keerthana.jpeg',
  'Vidisha': '/assets/images-of-team-members/coordinators_26_27/vidisha.jpeg',
  'RACHANA SRI': '/assets/images-of-team-members/coordinators 2025-26/Rachana.jpg',
  'HARICCHARAN M': '/assets/images-of-team-members/coordinators 2025-26/Hariccharan.jpg',
  'Nikshep': '/assets/images-of-team-members/Nikshep.jpeg',
  'Abishekapriyan S': '/assets/images-of-team-members/coordinators 2025-26/Abhishek.jpg',
  'Suraj Ramnath': '/assets/images-of-team-members/coordinators 2025-26/Suraj.jpg',
  'Kirtana Prakash': '/assets/images-of-team-members/coordinators 2025-26/Kirtana.jpg',
  'Gedela Avinash': '/assets/images-of-team-members/coordinators 2025-26/Avinash.jpg',
   'Asim Vats': '/assets/images-of-team-members/coordinators 2025-26/Asim.jpg',
   'Srikiran Ravanam': '/assets/images-of-team-members/coordinators 2025-26/Srikiran.jpeg',
   'Ajeya P': '/assets/images-of-team-members/coordinators 2025-26/Ajeya.png',
 }

const imagePosition = {
  'Toshith': 'center 20%',
  'Aditya Goel': 'center 10%',
  'Nantha Kumaran': 'center 10%',
  'Suraj Ramnath': 'center 10%',
  'Lekhashree': 'center 10%',
  'HARICCHARAN M': 'center 10%',
  'Abishekapriyan S': 'center 10%',
  'Gedela Avinash': 'center 10%',
  'Rohit': 'center 25%',
  'Shruti': 'center 25%',
  'Srikiran Ravanam': 'center 22%',
  'Nikhil Kanakam': 'center 20%',
  'Akshay KC': 'center 20%',
  'J Olive Jerusha': 'center 22%',
}

const getMemberStyle = (name) => {
  return {
    objectFit: 'cover',
    ...(imagePosition[name] && { objectPosition: imagePosition[name] }),
  }
}

const galleryGroups = normalizeAssetPaths({
  '2025-26': [
    {
      title: 'Trip 2025-26',
      images: [
        '/assets/Gallery/Horizon trip/IMG_20260125_110703.jpg',
        '/assets/Gallery/Horizon trip/IMG_20260124_143016.jpg',
        '/assets/Gallery/Horizon trip/IMG_20260124_143008.jpg',
        '/assets/Gallery/Horizon trip/IMG_20260124_131403.jpg',
        '/assets/Gallery/Horizon trip/IMG20260125181152.jpg',
        '/assets/Gallery/Horizon trip/IMG20260125124734.jpg',
        '/assets/Gallery/Horizon trip/IMG20260124152341.jpg',
        '/assets/Gallery/Horizon trip/IMG20260124145534.jpg',
        '/assets/Gallery/Horizon trip/WhatsApp Image 2026-08-11 at 20.54.42.jpeg',
        '/assets/Gallery/Horizon trip/WhatsApp Image 2026-08-11 at 20.54.03.jpeg',
        '/assets/Gallery/Horizon trip/WhatsApp Image 2026-08-11 at 20.53.40.jpeg',
        '/assets/Gallery/Horizon trip/WhatsApp Image 2026-08-11 at 20.55.41.jpeg',
        '/assets/Gallery/Horizon trip/WhatsApp Image 2026-08-11 at 20.55.23.jpeg',
        '/assets/Gallery/Horizon trip/WhatsApp Image 2026-08-11 at 20.56.37.jpeg',
        '/assets/Gallery/Horizon trip/PXL_20260124_090452778.jpg',
        '/assets/Gallery/Horizon trip/PXL_20260124_075629971.jpg',
        '/assets/Gallery/Horizon trip/IMG_20260125_120324.jpg',
        '/assets/Gallery/Horizon trip/PXL_20260125_070150513.jpg',
        '/assets/Gallery/Horizon trip/PXL_20260125_122156832.jpg',
        '/assets/Gallery/Horizon trip/PXL_20260125_144012296.jpg',
      ],
    },
    {
      title: 'Star party',
      images: [
        '/assets/Gallery/star party 25-26/WhatsApp Image 2026-08-11 at 21.09.13.jpeg',
        '/assets/Gallery/star party 25-26/WhatsApp Image 2026-08-11 at 21.07.09.jpeg',
        '/assets/Gallery/star party 25-26/WhatsApp Image 2026-08-11 at 21.06.58.jpeg',
        '/assets/Gallery/star party 25-26/WhatsApp Image 2026-08-11 at 21.06.49.jpeg',
        '/assets/Gallery/star party 25-26/WhatsApp Image 2026-08-11 at 21.01.59.jpeg',
        '/assets/Gallery/star party 25-26/WhatsApp Image 2026-08-11 at 21.00.43.jpeg',
        '/assets/Gallery/star party 25-26/WhatsApp Image 2026-08-11 at 21.00.04.jpeg',
        '/assets/Gallery/star party 25-26/WhatsApp Image 2026-08-11 at 20.59.33.jpeg',
        '/assets/Gallery/star party 25-26/WhatsApp Image 2026-08-11 at 21.09.57.jpeg',
      ],
    },
    {
      title: 'Research conclave',
      images: [
        '/assets/Gallery/Research conclave 2025-25/PXL_20251102_124306440.jpg',
        '/assets/Gallery/Research conclave 2025-25/PXL_20251102_124107030.jpg',
        '/assets/Gallery/Research conclave 2025-25/PXL_20251102_123625609.jpg',
        '/assets/Gallery/Research conclave 2025-25/PXL_20251102_123437168.jpg',
        '/assets/Gallery/Research conclave 2025-25/PXL_20251102_123325275.jpg',
        '/assets/Gallery/Research conclave 2025-25/PXL_20251102_123103903.PORTRAIT.jpg',
        '/assets/Gallery/Research conclave 2025-25/PXL_20251102_123040052.jpg',
        '/assets/Gallery/Research conclave 2025-25/IMG_20251102_190436408_HDR.jpg',
        '/assets/Gallery/Research conclave 2025-25/IMG_20251102_141827611.jpg',
        '/assets/Gallery/Research conclave 2025-25/IMG20251102175311.jpg',
      ],
    },
    {
      title: 'Open house',
      images: [
        '/assets/Gallery/open house 25-26/IMG20260314171500.jpg',
        '/assets/Gallery/open house 25-26/IMG20260314165610.jpg',
        '/assets/Gallery/open house 25-26/IMG_20260314_111005.jpg',
        '/assets/Gallery/open house 25-26/IMG20260315170301_01.jpg',
        '/assets/Gallery/open house 25-26/IMG20260315110718.jpg',
        '/assets/Gallery/open house 25-26/IMG20260314172018.jpg',
        '/assets/Gallery/open house 25-26/IMG_20260314_174005.jpg',
        '/assets/Gallery/open house 25-26/IMG_20260314_142402.jpg',
        '/assets/Gallery/open house 25-26/IMG_20260315_112755.jpg',
      ],
    },
    {
      title: 'Observation session',
      images: [
        '/assets/Gallery/Observation session 25-26/IMG20250728001932.jpg',
        '/assets/Gallery/Observation session 25-26/IMG20250727205018.jpg',
        '/assets/Gallery/Observation session 25-26/IMG20250727204436.jpg',
        '/assets/Gallery/Observation session 25-26/IMG20250727204319.jpg',
        '/assets/Gallery/Observation session 25-26/IMG20250727204246.jpg',
        '/assets/Gallery/Observation session 25-26/IMG20250727204214.jpg',
        '/assets/Gallery/Observation session 25-26/IMG20250727204152.jpg',
        '/assets/Gallery/Observation session 25-26/IMG20250727204027.jpg',
      ],
    },
    {
      title: 'Zero shadow day',
      images: [
        '/assets/Gallery/zero shadow day 25-26/IMG_20250818_124002.jpg',
        '/assets/Gallery/zero shadow day 25-26/IMG_20250818_121714.jpg',
        '/assets/Gallery/zero shadow day 25-26/IMG_20250818_121651.jpg',
        '/assets/Gallery/zero shadow day 25-26/IMG_20250818_121649.jpg',
        '/assets/Gallery/zero shadow day 25-26/IMG_20250818_121614.jpg',
        '/assets/Gallery/zero shadow day 25-26/IMG_20250818_120937.jpg',
        '/assets/Gallery/zero shadow day 25-26/IMG_20250818_120847.jpg',
        '/assets/Gallery/zero shadow day 25-26/IMG_20250818_120838.jpg',
        '/assets/Gallery/zero shadow day 25-26/IMG20250818121728.jpg',
      ],
    },
  ],
})

export default function Team() {
  const [activeTenure, setActiveTenure] = useState('2026-27')
  const [activeGalleryTenure, setActiveGalleryTenure] = useState('2025-26')
  const observerRef = useRef(null)
  const [failedImages, setFailedImages] = useState(new Set())

  const members = normalizedTeamData[activeTenure]

  const grouped = {}
  for (const m of members) {
    if (!grouped[m.section]) grouped[m.section] = []
    grouped[m.section].push(m)
  }

  const handleImageError = (name) => {
    setFailedImages(prev => new Set(prev).add(name))
  }

  useEffect(() => {
    const sections = document.querySelectorAll('.team-section')
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.2 }
    )
    sections.forEach((el) => obs.observe(el))
    observerRef.current = obs
    return () => obs.disconnect()
  }, [activeTenure])

  return (
    <article className="page events-page team-page">
      <SpaceBackground />
      <div className="events-container">
        <header className="events-header">
          <h1 className="events-title">Our Team</h1>
          <p className="events-subtitle">Meet the people who make Horizon possible.</p>
        </header>
        <nav className="year-pills" aria-label="Select tenure">
          {tenures.map(t => (
            <button
              key={t}
              className={`year-pill${activeTenure === t ? ' year-pill--active' : ''}`}
              onClick={() => setActiveTenure(t)}
            >
              {activeTenure === t && <span className="year-pill__comet" />}
              <span className="year-pill__label">{t}</span>
            </button>
          ))}
        </nav>
        <div className="team-content">
            {['core', 'coordinator'].map(section => (
              grouped[section]?.length > 0 && (
                <section key={section} className="team-section">
                  <h2 className="team-section-title">{sectionLabel[section]} &mdash; {activeTenure}</h2>
                  <div className="team-grid">
                    {grouped[section].map((m, i) => {
                      const imageSrc = imageMap[m.name]
                      const hasImage = !!imageSrc && !failedImages.has(m.name)
                      const initials = m.name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
                      return (
                        <div key={m.name} className="team-card" style={{ '--reveal-delay': `${i * 0.06}s` }}>
                          <div className={`team-card__image${!hasImage ? ' team-card__image--placeholder' : ''}`}>
                            {hasImage ? (
                              <img
                                src={imagePath(imageSrc)}
                                alt={m.name}
                                loading="lazy"
                                style={getMemberStyle(m.name)}
                                onError={() => handleImageError(m.name)}
                              />
                            ) : (
                              <span>{initials}</span>
                            )}
                          </div>
                          <div className="team-card__info">
                            <h3 className="team-card__name">{m.name}</h3>
                            <p className="team-card__role">{m.role}</p>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </section>
              )
            ))}

            <div id="gallery" className="team-section" style={{ marginTop: 'calc(var(--spacing-2xl) * 1.5)' }}>
              <div className="project-divider" style={{ marginBottom: 'var(--spacing-2xl)' }} />
              <div className="events-header" style={{ marginBottom: 'var(--spacing-md)' }}>
                <h2 className="events-title">Gallery &mdash; {activeGalleryTenure}</h2>
                <p className="events-subtitle">From star parties and observation sessions to events and moments behind the scenes — a glimpse into our journey at Horizon</p>
              </div>
              <nav className="year-pills" aria-label="Select gallery tenure" style={{ marginBottom: 'var(--spacing-lg)' }}>
                {tenures.map(t => (
                  <button
                    key={t}
                    className={`year-pill${activeGalleryTenure === t ? ' year-pill--active' : ''}`}
                    onClick={() => setActiveGalleryTenure(t)}
                  >
                    {activeGalleryTenure === t && <span className="year-pill__comet" />}
                    <span className="year-pill__label">{t}</span>
                  </button>
                ))}
              </nav>
              {activeGalleryTenure === '2025-26' && (
                <div className="gallery-sections">
                  {galleryGroups['2025-26'].map((group) => (
                    <GalleryRow key={group.title} title={group.title} images={group.images} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
    </article>
  )
}
