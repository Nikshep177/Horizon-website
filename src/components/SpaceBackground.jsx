import { imagePath } from '../lib/image-path'

export default function SpaceBackground() {
  return (
    <div
      className="space-bg"
      style={{ '--space-background-image': `url(${imagePath('/assets/images/background.jpg')})` }}
      aria-hidden="true"
    >
      <div className="space-bg__glow space-bg__glow--one" />
      <div className="space-bg__glow space-bg__glow--two" />
      <div className="space-bg__glow space-bg__glow--three" />
    </div>
  )
}
