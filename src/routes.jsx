import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'

const Home = lazy(() => import('./pages/Home'))
const Projects = lazy(() => import('./pages/Projects'))
const ProjectDetail = lazy(() => import('./pages/ProjectDetail'))
const Events = lazy(() => import('./pages/Events'))
const EventCategory = lazy(() => import('./pages/EventCategory'))
const Qiskit = lazy(() => import('./pages/Qiskit'))
const Articles = lazy(() => import('./pages/Articles'))
const ArticleDetail = lazy(() => import('./pages/ArticleDetail'))
const Astrophotography = lazy(() => import('./pages/Astrophotography'))
const Guild = lazy(() => import('./pages/Guild'))
const CompetitionDetail = lazy(() => import('./pages/CompetitionDetail'))
const IPT = lazy(() => import('./pages/IPT'))
const ProblemDetail = lazy(() => import('./pages/ProblemDetail'))
const Team = lazy(() => import('./pages/Team'))
const Contact = lazy(() => import('./pages/Contact'))
const NotFound = lazy(() => import('./pages/NotFound'))

export default function AppRoutes() {
  return (
    <Suspense fallback={<div className="route-loading" role="status">Loading page...</div>}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/:tenure/:id" element={<ProjectDetail />} />
        <Route path="/projects/:id" element={<ProjectDetail />} />
        <Route path="/events" element={<Events />} />
        <Route path="/events/:category" element={<EventCategory />} />
        <Route path="/qiskit" element={<Qiskit />} />
        <Route path="/articles" element={<Articles />} />
        <Route path="/articles/:id" element={<ArticleDetail />} />
        <Route path="/astrophotography" element={<Astrophotography />} />
        <Route path="/guild" element={<Guild />} />
        <Route path="/guild/competitions/:id" element={<CompetitionDetail />} />
        <Route path="/ipt" element={<IPT />} />
        <Route path="/ipt/:year/:slug" element={<ProblemDetail />} />
        <Route path="/team" element={<Team />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  )
}
