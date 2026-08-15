const base = import.meta.env.BASE_URL || '/'

function isStaticAssetPath(value) {
  return typeof value === 'string' && (
    value.startsWith('/assets/') ||
    value.startsWith('/assets') ||
    value.startsWith('/Gallery/') ||
    value.startsWith('/images/') ||
    value.startsWith('/icons.svg') ||
    value.startsWith('/favicon.svg')
  )
}

export function resolveAssetPath(path) {
  if (!path || typeof path !== 'string') return path

  if (/^(data:|https?:|mailto:|tel:|#|\/\/)/i.test(path)) {
    return path
  }

  const normalized = path.replace(/^\/+/, '')
  return `${base}${normalized}`
}

export function imagePath(path) {
  if (!path) return path
  if (isStaticAssetPath(path)) {
    return encodeURI(resolveAssetPath(path))
  }
  return encodeURI(path)
}

export function normalizeAssetPaths(value) {
  if (Array.isArray(value)) {
    return value.map(item => normalizeAssetPaths(item))
  }

  if (value && typeof value === 'object') {
    const normalized = {}

    for (const [key, item] of Object.entries(value)) {
      normalized[key] = normalizeAssetPaths(item)
    }

    return normalized
  }

  if (isStaticAssetPath(value)) {
    return resolveAssetPath(value)
  }

  return value
}

export function normalizeMarkdownAssetUrls(content) {
  if (typeof content !== 'string') return content

  return content.replace(/(\!?\[[^\]]*\]\()\/((?:assets|Gallery|images|icons\.svg|favicon\.svg)[^)]+)(\))/g, (match, prefix, assetPath, suffix) => {
    return `${prefix}${resolveAssetPath(`/${assetPath}`)}${suffix}`
  }).replace(/(src=|href=)["']\/((?:assets|Gallery|images|icons\.svg|favicon\.svg)[^"']+)["']/g, (match, attr, assetPath) => {
    return `${attr}"${resolveAssetPath(`/${assetPath}`)}"`
  })
}
