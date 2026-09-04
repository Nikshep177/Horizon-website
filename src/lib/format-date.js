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

export function compareDatesDesc(left, right) {
  const leftTime = Date.parse(left ?? '')
  const rightTime = Date.parse(right ?? '')
  const leftValid = !Number.isNaN(leftTime)
  const rightValid = !Number.isNaN(rightTime)

  if (!leftValid && !rightValid) return 0
  if (!leftValid) return 1
  if (!rightValid) return -1
  return rightTime - leftTime
}
