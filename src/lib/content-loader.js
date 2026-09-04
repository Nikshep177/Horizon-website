import { normalizeAssetPaths, normalizeMarkdownAssetUrls } from './image-path'
import { eventsData, projects } from './site-data'
import { compareDatesDesc } from './format-date'

const files = import.meta.glob('/src/content/**/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
})

function splitInlineList(value) {
  const items = []
  let current = ''
  let quote = null

  for (const character of value) {
    if ((character === '"' || character === "'") && (!quote || quote === character)) {
      quote = quote ? null : character
    }

    if (character === ',' && !quote) {
      items.push(current.trim())
      current = ''
    } else {
      current += character
    }
  }

  if (current.trim()) items.push(current.trim())
  return items
}

function parseScalar(value) {
  if (value.startsWith('[') && value.endsWith(']')) {
    return splitInlineList(value.slice(1, -1)).map(parseScalar)
  }

  if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
    return value.slice(1, -1)
  }

  if (value === 'true') return true
  if (value === 'false') return false
  if (value === 'null' || value === '~') return null
  if (value !== '' && Number.isFinite(Number(value))) return Number(value)
  return value
}

function parseFrontmatter(raw) {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/)
  if (!match) return { data: {}, content: normalizeMarkdownAssetUrls(raw) }

  const data = {}
  for (const line of match[1].split('\n')) {
    const colon = line.indexOf(':')
    if (colon === -1) continue
    const key = line.slice(0, colon).trim()
    data[key] = parseScalar(line.slice(colon + 1).trim())
  }

  return {
    data: normalizeAssetPaths(data),
    content: normalizeMarkdownAssetUrls(match[2].trim()),
  }
}

const articles = []
const events = []
const iptProblems = []
const unpublishedArticleIds = new Set([
  'getting-started-with-open-source',
  'project-radian',
  'project-starspec',
  'project-optiqomm',
  'project-sonicphase',
  'project-ferrostats',
  'project-quantaband',
  'project-ligo',
  'project-apteam',
  'project-apteam-2627',
])

for (const [filePath, raw] of Object.entries(files)) {
  const { data, content } = parseFrontmatter(raw)
  const parts = filePath.replace('/src/content/', '').split('/')
  const category = parts[0]
  const id = parts[1].replace('.md', '')

  const entry = { id, ...data, content }

  if (category === 'articles') {
    articles.push({ ...entry, published: !unpublishedArticleIds.has(id) })
  } else if (category === 'events') {
    events.push(entry)
  } else if (category === 'ipt') {
    iptProblems.push(entry)
  }
}

for (const [tenure, tenureProjects] of Object.entries(projects)) {
  for (const project of tenureProjects) {
    articles.push({
      id: `project-${project.id}`,
      title: project.title,
      date: project.date,
      content: project.content,
      image: project.image,
      author: project.author,
      category: 'Project',
      tenure,
      published: !unpublishedArticleIds.has(`project-${project.id}`),
    })
  }
}

for (const [tenure, tenureData] of Object.entries(eventsData)) {
  const tenureEvents = Array.isArray(tenureData)
    ? tenureData
    : Object.values(tenureData)

  for (const event of tenureEvents) {
    events.push({ ...event, tenure })
  }
}

articles.sort((a, b) => compareDatesDesc(a.date, b.date))
events.sort((a, b) => compareDatesDesc(a.date, b.date))
iptProblems.sort((a, b) => b.year - a.year)

const publishedArticles = articles.filter(article => article.published !== false)

export function getArticles() {
  return publishedArticles
}

export function getArticle(id) {
  return publishedArticles.find(a => a.id === id) || null
}

export function getEvents() {
  return events
}

export function getIPTProblems() {
  return iptProblems
}

export function getIPTProblem(id) {
  return iptProblems.find(p => p.id === id) || null
}

export function getIPTProblemBySlug(year, slug) {
  return iptProblems.find(p => String(p.year) === String(year) && p.slug === slug) || null
}

export function getIPTProblemsByYear(year) {
  return iptProblems.filter(p => p.year === year)
}

export function getIPTYears() {
  const years = [...new Set(iptProblems.map(p => p.year))]
  return years.sort((a, b) => b - a)
}
