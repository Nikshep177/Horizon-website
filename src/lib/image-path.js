const base = import.meta.env.BASE_URL || '/'

export function imagePath(path) {
  if (!path) return path
  const fullPath = base + path.replace(/^\//, '')
  return encodeURI(fullPath)
}
