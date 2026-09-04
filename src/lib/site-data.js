import rawAstroGallery from '../data/astro-gallery.json'
import rawCompetitions from '../data/competitions.json'
import rawEvents from '../data/events.json'
import rawProjects from '../data/projects.json'
import rawTeam from '../data/team.json'
import { normalizeAssetPaths } from './image-path'

// Keep public JSON data normalized at one boundary so page components share the same asset contract.
export const astroGallery = normalizeAssetPaths(rawAstroGallery)
export const competitions = normalizeAssetPaths(rawCompetitions)
export const eventsData = normalizeAssetPaths(rawEvents)
export const projects = normalizeAssetPaths(rawProjects)
export const teamData = normalizeAssetPaths(rawTeam)
