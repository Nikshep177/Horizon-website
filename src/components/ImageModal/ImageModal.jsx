import { useCallback, useRef } from 'react'
import { imagePath } from '../../lib/image-path'
import useDialog from '../../lib/use-dialog'
import './ImageModal.css'

const exifFields = [
  { label: 'Camera', key: 'camera' },
  { label: 'Mount', key: 'mount' },
  { label: 'Filter', key: 'filter' },
  { label: 'Location', key: 'location' },
  { label: 'Telescope', key: 'telescope' },
  { label: 'Exposure', key: 'exposure' },
  { label: 'ISO/Gain', key: 'iso' }
]

export default function ImageModal({ image, onClose }) {
  const dialogRef = useRef(null)
  const closeButtonRef = useRef(null)

  const handleClose = useCallback(() => {
    onClose()
  }, [onClose])

  useDialog({
    open: Boolean(image),
    onClose: handleClose,
    dialogRef,
    initialFocusRef: closeButtonRef,
  })

  if (!image) return null

  return (
    <div
      className="image-modal-overlay"
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby="image-modal-title"
      tabIndex="-1"
      onClick={handleClose}
    >
      <div className="image-modal-container" onClick={(e) => e.stopPropagation()}>
        <button
          ref={closeButtonRef}
          type="button"
          className="image-modal-close"
          onClick={handleClose}
          aria-label="Close image details"
        >
          ✕
        </button>

        <div className="image-modal-body">
          <div className="image-modal-left-column">
            <img
              src={imagePath(image.highResImageSrc || image.imageSrc || image.src)}
              alt={image.title}
              className="image-modal-image"
            />
            <h2 id="image-modal-title" className="image-modal-title">{image.title}</h2>
            <p className="image-modal-description">{image.description}</p>
          </div>

          <div className="image-modal-right-column">
            <div className="image-modal-exif">
              <h3 className="image-modal-exif-header">EXIF & Equipment</h3>
              <div className="image-modal-divider"></div>

              <div className="image-modal-exif-grid">
                {exifFields.map(field => {
                  const value = image.exif?.[field.key]
                  if (!value) return null
                  return (
                    <div key={field.key} className="exif-item">
                      <span className="exif-label">{field.label}</span>
                      <span className="exif-value">{value}</span>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
