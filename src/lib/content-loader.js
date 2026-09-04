import { normalizeAssetPaths, normalizeMarkdownAssetUrls } from './image-path'
import { eventsData, projects } from './site-data'

const files = import.meta.glob('/src/content/**/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
})

function parseFrontmatter(raw) {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/)
  if (!match) return { data: {}, content: normalizeMarkdownAssetUrls(raw) }

  const data = {}
  for (const line of match[1].split('\n')) {
    const colon = line.indexOf(':')
    if (colon === -1) continue
    const key = line.slice(0, colon).trim()
    let value = line.slice(colon + 1).trim()

    if (value.startsWith('[') && value.endsWith(']')) {
      value = value.slice(1, -1).split(',').map(s =>
        s.trim().replace(/^"(.*)"$/, '$1').replace(/^'(.*)'$/, '$1')
      )
    } else {
      value = value.replace(/^"(.*)"$/, '$1').replace(/^'(.*)'$/, '$1')
    }
    data[key] = value
  }

  return {
    data: normalizeAssetPaths(data),
    content: normalizeMarkdownAssetUrls(match[2].trim()),
  }
}

const articles = []
const events = []
const iptProblems = []

for (const [filePath, raw] of Object.entries(files)) {
  const { data, content } = parseFrontmatter(raw)
  const parts = filePath.replace('/src/content/', '').split('/')
  const category = parts[0]
  const id = parts[1].replace('.md', '')

  const entry = { id, ...data, content }

  if (category === 'articles') {
    articles.push(entry)
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

articles.sort((a, b) => new Date(b.date) - new Date(a.date))
events.sort((a, b) => new Date(b.date) - new Date(a.date))
iptProblems.sort((a, b) => b.year - a.year)

export function getArticles() {
  return articles
}

export function getArticle(id) {
  return articles.find(a => a.id === id) || null
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
