const defaultOptions = {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
}

export function formatDate(value, options = defaultOptions) {
  if (!value) return ''

  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return ''

  return date.toLocaleDateString('en-US', options)
}
