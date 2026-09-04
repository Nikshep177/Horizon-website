import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { imagePath } from '../lib/image-path'
import useDialog from '../lib/use-dialog'
import '../styles/gallery.css'

export default function GalleryRow({ title, images = [] }) {
  const trackRef = useRef(null)
  const cardRefs = useRef([])
  const dragState = useRef({ isDown: false, startX: 0, startScroll: 0, moved: false })
  const [scrollState, setScrollState] = useState({ atStart: true, atEnd: true })
  const [lightboxIndex, setLightboxIndex] = useState(null)
  const lightboxRef = useRef(null)
  const lightboxCloseRef = useRef(null)

  const updateFocus = useCallback(() => {
    const track = trackRef.current
    if (!track) return
    const trackRect = track.getBoundingClientRect()
    const center = trackRect.left + trackRect.width / 2
    const half = trackRect.width / 2
    cardRefs.current.forEach((el) => {
      if (!el) return
      const rect = el.getBoundingClientRect()
      const cardCenter = rect.left + rect.width / 2
      const dist = Math.abs(cardCenter - center) / half
      const focus = 1 + 0.12 * Math.max(0, 1 - dist / 0.75)
      el.style.setProperty('--focus-scale', focus.toFixed(3))
      el.style.setProperty('--focus-z', focus > 1.03 ? 3 : 1)
    })
  }, [])

  const updateScrollState = useCallback(() => {
    const track = trackRef.current
    if (!track) return
    const atStart = track.scrollLeft <= 2
    const atEnd = track.scrollLeft >= track.scrollWidth - track.clientWidth - 2
    setScrollState({ atStart, atEnd })
  }, [])

  useLayoutEffect(() => {
    updateScrollState()
    updateFocus()
  }, [updateScrollState, updateFocus])

  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    const handleScroll = () => {
      updateScrollState()
      updateFocus()
    }
    track.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll)
    return () => {
      track.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [updateScrollState, updateFocus])

  const scrollByCards = useCallback((direction) => {
    const track = trackRef.current
    if (!track) return
    track.scrollBy({ left: direction * track.clientWidth * 0.85, behavior: 'smooth' })
  }, [])

  const openLightbox = useCallback((index) => setLightboxIndex(index), [])
  const closeLightbox = useCallback(() => setLightboxIndex(null), [])
  const nextImage = useCallback(() => {
    setLightboxIndex((i) => (i === null ? null : (i + 1) % images.length))
  }, [images.length])
  const prevImage = useCallback(() => {
    setLightboxIndex((i) => (i === null ? null : (i - 1 + images.length) % images.length))
  }, [images.length])

  useDialog({
    open: lightboxIndex !== null,
    onClose: closeLightbox,
    dialogRef: lightboxRef,
    initialFocusRef: lightboxCloseRef,
  })

  useEffect(() => {
    if (lightboxIndex === null) return undefined
    const handleKey = (event) => {
      if (event.key === 'ArrowRight') nextImage()
      else if (event.key === 'ArrowLeft') prevImage()
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [lightboxIndex, nextImage, prevImage])

  const handlePointerDown = (e) => {
    if (e.pointerType !== 'mouse') return
    const track = trackRef.current
    if (!track) return
    dragState.current = { isDown: true, startX: e.clientX, startScroll: track.scrollLeft, moved: false }
    track.setPointerCapture(e.pointerId)
  }

  const handlePointerMove = (e) => {
    const s = dragState.current
    if (!s.isDown || e.pointerType !== 'mouse') return
    const track = trackRef.current
    const dx = e.clientX - s.startX
    if (Math.abs(dx) > 5) s.moved = true
    track.scrollLeft = s.startScroll - dx
  }

  const endDrag = () => {
    dragState.current.isDown = false
  }

  const handleCardClick = (index) => {
    if (dragState.current.moved) {
      dragState.current.moved = false
      return
    }
    openLightbox(index)
  }

  if (!images.length) return null

  const canScroll = !scrollState.atStart || !scrollState.atEnd

  return (
    <section className="gallery-row">
      <div className="gallery-row__header">
        <div className="gallery-row__heading">
          <span className="gallery-row__heading-star" aria-hidden="true">&#10022;</span>
          <h3 className="gallery-row__title">{title}</h3>
        </div>
        {canScroll && (
          <div className="gallery-row__controls">
            <button
              type="button"
              className="gallery-row__arrow"
              onClick={() => scrollByCards(-1)}
              disabled={scrollState.atStart}
              aria-label={`Scroll ${title} left`}
            >
              &#8249;
            </button>
            <button
              type="button"
              className="gallery-row__arrow"
              onClick={() => scrollByCards(1)}
              disabled={scrollState.atEnd}
              aria-label={`Scroll ${title} right`}
            >
              &#8250;
            </button>
          </div>
        )}
      </div>

      <span className="gallery-row__comet" aria-hidden="true" />

      <div
        className={`gallery-row__viewport${scrollState.atStart ? ' gallery-row__viewport--start' : ''}${scrollState.atEnd ? ' gallery-row__viewport--end' : ''}`}
      >
        <div
          className="gallery-row__track"
          ref={trackRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={endDrag}
          onPointerLeave={endDrag}
        >
          {images.map((imgSrc, idx) => (
            <button
              key={`${imgSrc}-${idx}`}
              type="button"
              className="gallery-row__card"
              ref={(el) => {
                cardRefs.current[idx] = el
              }}
              onClick={() => handleCardClick(idx)}
              aria-label={`Open ${title} image ${idx + 1}`}
            >
              <img src={imagePath(imgSrc)} alt={`${title} ${idx + 1}`} loading="lazy" draggable={false} />
            </button>
          ))}
        </div>
      </div>

      {lightboxIndex !== null && (
        <div
          className="gallery-lightbox"
          ref={lightboxRef}
          role="dialog"
          aria-modal="true"
          aria-label={`${title} gallery lightbox`}
          tabIndex="-1"
          onClick={closeLightbox}
        >
          <button
            type="button"
            ref={lightboxCloseRef}
            className="gallery-lightbox__close"
            onClick={closeLightbox}
            aria-label="Close lightbox"
          >
            &times;
          </button>
          <button
            type="button"
            className="gallery-lightbox__nav gallery-lightbox__nav--prev"
            onClick={(e) => {
              e.stopPropagation()
              prevImage()
            }}
            aria-label="Previous image"
          >
            &#8249;
          </button>
          <div className="gallery-lightbox__stage" onClick={(e) => e.stopPropagation()}>
            <img src={imagePath(images[lightboxIndex])} alt={`${title} ${lightboxIndex + 1}`} />
            <p className="gallery-lightbox__counter">
              {lightboxIndex + 1} / {images.length}
            </p>
          </div>
          <button
            type="button"
            className="gallery-lightbox__nav gallery-lightbox__nav--next"
            onClick={(e) => {
              e.stopPropagation()
              nextImage()
            }}
            aria-label="Next image"
          >
            &#8250;
          </button>
        </div>
      )}
    </section>
  )
}
