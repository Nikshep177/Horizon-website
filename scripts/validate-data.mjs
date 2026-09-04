import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const errors = []
const missingAssets = []
const caseMismatchedAssets = []
let assetPathsWithSpaces = 0

function readJson(relativePath) {
  const absolutePath = path.join(root, relativePath)

  try {
    return JSON.parse(fs.readFileSync(absolutePath, 'utf8'))
  } catch (error) {
    errors.push(`${relativePath}: ${error.message}`)
    return null
  }
}

function report(label, message) {
  errors.push(`${label}: ${message}`)
}

function requireFields(record, fields, label) {
  if (!record || typeof record !== 'object') {
    report(label, 'expected an object')
    return
  }

  for (const field of fields) {
    const value = record[field]
    if (value === undefined || value === null || value === '') {
      report(label, `missing required field "${field}"`)
    }
  }
}

function validateId(value, label) {
  if (typeof value !== 'string' || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value)) {
    report(label, `invalid route id "${value ?? ''}"`)
  }
}

function validateUnique(values, label) {
  const seen = new Set()

  for (const value of values) {
    if (seen.has(value)) report(label, `duplicate route id "${value}"`)
    seen.add(value)
  }
}

function validateProjects(projects) {
  if (!projects || typeof projects !== 'object') return

  for (const [tenure, records] of Object.entries(projects)) {
    if (!Array.isArray(records)) {
      report(`projects.${tenure}`, 'expected an array')
      continue
    }

    validateUnique(records.map(project => project?.id), `projects.${tenure}`)
    records.forEach((project, index) => {
      const label = `projects.${tenure}[${index}]`
      requireFields(project, ['id', 'title', 'excerpt', 'content', 'image'], label)
      validateId(project?.id, label)
    })
  }
}

function validateEvents(events) {
  if (!events || typeof events !== 'object') return

  for (const [tenure, tenureData] of Object.entries(events)) {
    const records = Array.isArray(tenureData) ? tenureData : Object.values(tenureData || {})
    validateUnique(records.map(event => event?.id), `events.${tenure}`)

    records.forEach((event, index) => {
      const label = `events.${tenure}[${index}]`
      requireFields(event, ['id', 'title'], label)
      validateId(event?.id, label)
      if (event?.description === undefined && event?.about === undefined) {
        report(label, 'expected a description or about field')
      }
      if (!Array.isArray(event?.subcards) && !Array.isArray(event?.tiles)) {
        report(label, 'expected a subcards or tiles array')
      }
    })
  }
}

function validateCompetitions(competitions) {
  if (!Array.isArray(competitions)) return
  validateUnique(competitions.map(competition => competition?.id), 'competitions')

  competitions.forEach((competition, index) => {
    const label = `competitions[${index}]`
    requireFields(competition, ['id', 'name', 'description', 'years', 'image'], label)
    validateId(competition?.id, label)
    if (!Array.isArray(competition?.years) || competition.years.length === 0) {
      report(label, 'years must be a non-empty array')
    }
  })
}

function validateGallery(gallery) {
  if (!Array.isArray(gallery)) return
  validateUnique(gallery.map(entry => entry?.id), 'astro-gallery')

  gallery.forEach((entry, index) => {
    const label = `astro-gallery[${index}]`
    requireFields(entry, ['id', 'title', 'description', 'imageSrc', 'highResImageSrc'], label)
    validateId(entry?.id, label)
  })
}

function validateTeam(team) {
  if (!team || typeof team !== 'object') return

  for (const [tenure, records] of Object.entries(team)) {
    if (!Array.isArray(records)) {
      report(`team.${tenure}`, 'expected an array')
      continue
    }

    validateUnique(records.map(member => member?.name), `team.${tenure}`)
    records.forEach((member, index) => {
      requireFields(member, ['name', 'role', 'section'], `team.${tenure}[${index}]`)
    })
  }
}

function validateIptProblems(problems) {
  if (!Array.isArray(problems)) return

  const years = new Set()
  for (const [index, group] of problems.entries()) {
    const label = `ipt-problems[${index}]`
    requireFields(group, ['year', 'problems'], label)
    if (years.has(group?.year)) report(label, `duplicate year "${group.year}"`)
    years.add(group?.year)

    if (!Array.isArray(group?.problems)) {
      report(label, 'problems must be an array')
      continue
    }

    validateUnique(group.problems.map(problem => problem?.title), `${label}.problems`)
    group.problems.forEach((problem, problemIndex) => {
      requireFields(problem, ['title', 'description', 'image'], `${label}.problems[${problemIndex}]`)
    })
  }
}

function parseFrontmatter(raw, filePath) {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n/)
  if (!match) {
    report(filePath, 'missing or malformed frontmatter')
    return {}
  }

  const data = {}
  for (const line of match[1].split('\n')) {
    const colon = line.indexOf(':')
    if (colon === -1) continue
    const key = line.slice(0, colon).trim()
    const value = line.slice(colon + 1).trim().replace(/^(["'])(.*)\1$/, '$2')
    data[key] = value
  }
  return data
}

function validateMarkdownContent() {
  const contentRoot = path.join(root, 'src/content')
  const markdownFiles = []

  function walk(directory) {
    for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
      const entryPath = path.join(directory, entry.name)
      if (entry.isDirectory()) walk(entryPath)
      else if (entry.name.endsWith('.md')) markdownFiles.push(entryPath)
    }
  }

  walk(contentRoot)
  const routeIds = new Map()

  for (const filePath of markdownFiles) {
    const relativePath = path.relative(root, filePath)
    const parts = path.relative(contentRoot, filePath).split(path.sep)
    const category = parts[0]
    const fileId = path.basename(filePath, '.md')
    const data = parseFrontmatter(fs.readFileSync(filePath, 'utf8'), relativePath)
    const label = relativePath

    if (category === 'articles') {
      requireFields(data, ['title', 'author', 'date', 'image'], label)
      const key = `article:${fileId}`
      if (routeIds.has(key)) report(label, `duplicate article slug "${fileId}"`)
      routeIds.set(key, label)
    } else if (category === 'events') {
      requireFields(data, ['title', 'date', 'poster', 'category'], label)
    } else if (category === 'ipt') {
      requireFields(data, ['title', 'year', 'slug', 'image', 'description'], label)
      if (data.slug && !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(data.slug)) {
        report(label, `invalid IPT slug "${data.slug}"`)
      }
      const key = `ipt:${data.year}:${data.slug}`
      if (routeIds.has(key)) report(label, `duplicate IPT route "${data.year}/${data.slug}"`)
      routeIds.set(key, label)
    }
  }
}

function collectAssetReferences(value, source, references, isMarkdown = false) {
  if (typeof value === 'string') {
    const quotedMatches = value.match(/\/(?:assets|Gallery|images)\/[^"'`<>\n]+(?=["'`<>])/g) || []
    const markdownMatches = isMarkdown
      ? value.match(/\/(?:assets|Gallery|images)\/[^)\n]+(?=\))/g) || []
      : []
    const rootMatches = value.match(/\/(?:icons\.svg|favicon\.svg)[^"'`<>\n)]*/g) || []
    const matches = [...new Set([...quotedMatches, ...markdownMatches, ...rootMatches])]
    for (const match of matches) {
      const assetPath = match.trim().replace(/\)$/, '')
      references.set(assetPath, (references.get(assetPath) || []).concat(source))
    }
    return
  }

  if (Array.isArray(value)) {
    value.forEach(item => collectAssetReferences(item, source, references, isMarkdown))
    return
  }

  if (value && typeof value === 'object') {
    Object.values(value).forEach(item => collectAssetReferences(item, source, references, isMarkdown))
  }
}

function listPublicFiles() {
  const files = []
  function walk(directory) {
    for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
      const entryPath = path.join(directory, entry.name)
      if (entry.isDirectory()) walk(entryPath)
      else files.push(path.relative(path.join(root, 'public'), entryPath).replaceAll(path.sep, '/'))
    }
  }
  walk(path.join(root, 'public'))
  return files
}

function validateAssetReferences() {
  const references = new Map()
  const sourceRoots = ['src', 'index.html', 'vite.config.js']
  const publicFiles = listPublicFiles()
  const publicFileSet = new Set(publicFiles)
  const lowerCasePublicFiles = new Map(publicFiles.map(file => [file.toLowerCase(), file]))

  for (const sourceRoot of sourceRoots) {
    const absolutePath = path.join(root, sourceRoot)
    const files = fs.statSync(absolutePath).isDirectory() ? [] : [absolutePath]

    if (files.length === 0) {
      const walk = directory => {
        for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
          const entryPath = path.join(directory, entry.name)
          if (entry.isDirectory()) walk(entryPath)
          else if (/\.(?:css|html|js|jsx|json|md)$/.test(entry.name)) files.push(entryPath)
        }
      }
      walk(absolutePath)
    }

    for (const filePath of files) {
      const relativePath = path.relative(root, filePath)
      collectAssetReferences(fs.readFileSync(filePath, 'utf8'), relativePath, references, filePath.endsWith('.md'))
    }
  }

  for (const [assetPath, sources] of references) {
    const relativeAssetPath = assetPath.slice(1)
    if (assetPath.includes(' ')) assetPathsWithSpaces += 1
    if (publicFileSet.has(relativeAssetPath)) continue

    const caseInsensitiveMatch = lowerCasePublicFiles.get(relativeAssetPath.toLowerCase())
    if (caseInsensitiveMatch) {
      caseMismatchedAssets.push({ assetPath, actualPath: `/${caseInsensitiveMatch}`, sources })
    } else {
      missingAssets.push({ assetPath, sources })
    }
  }
}

const projects = readJson('src/data/projects.json')
const events = readJson('src/data/events.json')
const competitions = readJson('src/data/competitions.json')
const gallery = readJson('src/data/astro-gallery.json')
const team = readJson('src/data/team.json')
const iptProblems = readJson('src/data/ipt-problems.json')

validateProjects(projects)
validateEvents(events)
validateCompetitions(competitions)
validateGallery(gallery)
validateTeam(team)
validateIptProblems(iptProblems)
validateMarkdownContent()
validateAssetReferences()

if (errors.length > 0) {
  console.error('Data validation failed:')
  errors.forEach(error => console.error(`- ${error}`))
  process.exitCode = 1
} else {
  console.log('Data validation passed: required fields, route identities, frontmatter, and collection shapes are valid.')
}

if (caseMismatchedAssets.length > 0) {
  console.warn(`Warning: ${caseMismatchedAssets.length} asset path(s) differ from the public filename casing.`)
  caseMismatchedAssets.forEach(({ assetPath, actualPath }) => console.warn(`- ${assetPath} -> ${actualPath}`))
}

if (missingAssets.length > 0) {
  console.warn(`Warning: ${missingAssets.length} referenced asset path(s) are not present in public/. Image gathering remains non-blocking.`)
  missingAssets.forEach(({ assetPath }) => console.warn(`- ${assetPath}`))
}

if (assetPathsWithSpaces > 0) {
  console.warn(`Warning: ${assetPathsWithSpaces} referenced asset path(s) contain spaces; keep them stable until the asset naming cleanup.`)
}
