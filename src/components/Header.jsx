import { Link, useLocation } from 'react-router-dom'
import { imagePath } from '../lib/image-path'
import PillNav from './PillNav'

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Projects', href: '/projects' },
  { label: 'Events', href: '/events' },
  { label: 'Qiskit', href: '/qiskit' },
  { label: 'Articles', href: '/articles' },
  { label: 'Astrophotography', href: '/astrophotography' },
  { label: 'Guild', href: '/guild' },
  { label: 'Team', href: '/team' },
  { label: 'Contact', href: '/contact' },
]

function getActiveHref(pathname) {
  if (pathname === '/') return '/'

  const activeItem = navItems
    .filter(item => item.href !== '/' && pathname.startsWith(item.href))
    .sort((a, b) => b.href.length - a.href.length)[0]

  return activeItem?.href || pathname
}

export default function Header() {
  const { pathname } = useLocation()
  const activeHref = getActiveHref(pathname)

  return (
    <header className="pill-header">
      <PillNav
        items={navItems}
        activeHref={activeHref}
        baseColor="var(--color-background)"
        pillColor="var(--color-border)"
        hoveredPillTextColor="#ffffff"
        pillTextColor="var(--color-text)"
        initialLoadAnimation
      />
      <Link to="/" className="pill-header__logo" aria-label="Home">
        <img src={imagePath('/assets/images/logo.png')} alt="Horizon" />
      </Link>
    </header>
  )
}
