export const eventCategoryThemes = {
  g2g: { bg: '#2d1b69', accent: '#7c3aed', glow: 'rgba(124, 58, 237, 0.3)' },
  q2q: { bg: '#0c2d48', accent: '#06b6d4', glow: 'rgba(6, 182, 212, 0.3)' },
  boltzmann: { bg: '#451a03', accent: '#f59e0b', glow: 'rgba(245, 158, 11, 0.3)' },
  observation: { bg: '#022c22', accent: '#10b981', glow: 'rgba(16, 185, 129, 0.3)' },
  summer: { bg: '#4a1942', accent: '#ec4899', glow: 'rgba(236, 72, 153, 0.3)' },
  qiskit: { bg: '#2e1065', accent: '#a78bfa', glow: 'rgba(167, 139, 250, 0.3)' },
  conclave: { bg: '#431407', accent: '#fb923c', glow: 'rgba(251, 146, 60, 0.3)' },
  cfi: { bg: '#020617', accent: '#38bdf8', glow: 'rgba(56, 189, 248, 0.3)' },
  freshie: { bg: '#3b0764', accent: '#e879f9', glow: 'rgba(232, 121, 249, 0.3)' },
  extra: { bg: '#1e1b4b', accent: '#a5b4fc', glow: 'rgba(165, 180, 252, 0.3)' },
  other: { bg: '#1e293b', accent: '#94a3b8', glow: 'rgba(148, 163, 184, 0.3)' },
}

export const projectThemes = [
  { bg: '#1e1b4b', accent: '#818cf8', glow: 'rgba(129, 140, 248, 0.35)' },
  { bg: '#4a1942', accent: '#f472b6', glow: 'rgba(244, 114, 182, 0.35)' },
  { bg: '#022c22', accent: '#34d399', glow: 'rgba(52, 211, 153, 0.35)' },
  { bg: '#451a03', accent: '#fbbf24', glow: 'rgba(251, 191, 36, 0.35)' },
  { bg: '#2e1065', accent: '#a78bfa', glow: 'rgba(167, 139, 250, 0.35)' },
  { bg: '#431407', accent: '#f87171', glow: 'rgba(248, 113, 113, 0.35)' },
  { bg: '#083344', accent: '#2dd4bf', glow: 'rgba(45, 212, 191, 0.35)' },
  { bg: '#1e293b', accent: '#fb923c', glow: 'rgba(251, 146, 60, 0.35)' },
]

export function getEventTheme(category) {
  return eventCategoryThemes[category] || eventCategoryThemes.other
}

export function getProjectTheme(index) {
  return projectThemes[index % projectThemes.length]
}
