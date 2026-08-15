import { useEffect } from 'react'
import { imagePath } from '../lib/image-path'

const exifFields = [
  { label: 'Telescope', key: 'telescope' },
  { label: 'Camera', key: 'camera' },
  { label: 'Mount', key: 'mount' },
  { label: 'Exposure', key: 'exposure' },
  { label: 'ISO/Gain', key: 'gain' },
  { label: 'Filters', key: 'filters' }
]

export default function ImageModal({ image, onClose }) {
  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  if (!image) return null

  return (
    <div className="image-modal">
      <div className="image-modal__overlay" onClick={onClose}></div>
      <div className="image-modal__box">
        <button className="image-modal__close" onClick={onClose}>X Close</button>
        <div className="image-modal__body">
          <div className="image-modal__photo">
            <img src={imagePath(image.imageSrc)} alt={image.title} />
          </div>
          <div className="image-modal__info">
            <h2 className="image-modal__title">{image.title}</h2>
            <p className="image-modal__description">{image.description}</p>
            <div className="image-modal__exif">
              <h3 className="image-modal__exif-header">📷 EXIF &amp; Equipment</h3>
              <div className="image-modal__divider"></div>
              <dl className="image-modal__exif-list">
                {exifFields.map(field => (
                  <div key={field.key} className="image-modal__exif-row">
                    <dt>{field.label}</dt>
                    <dd>{image.exif?.[field.key]}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
