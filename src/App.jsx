import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import ScrollToTop from './components/ScrollToTop'
import Home from './pages/Home'
import Projects from './pages/Projects'
import ProjectDetail from './pages/ProjectDetail'
import Events from './pages/Events'
import EventCategory from './pages/EventCategory'
import Articles from './pages/Articles'
import ArticleDetail from './pages/ArticleDetail'
import Astrophotography from './pages/Astrophotography'
import Guild from './pages/Guild'
import CompetitionDetail from './pages/CompetitionDetail'
import IPT from './pages/IPT'
import ProblemDetail from './pages/ProblemDetail'
import Team from './pages/Team'
import Contact from './pages/Contact'

export default function App() {
  return (
    <Layout>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/:tenure/:id" element={<ProjectDetail />} />
        <Route path="/projects/:id" element={<ProjectDetail />} />
        <Route path="/events" element={<Events />} />
        <Route path="/events/:category" element={<EventCategory />} />
        <Route path="/articles" element={<Articles />} />
        <Route path="/articles/:id" element={<ArticleDetail />} />
        <Route path="/astrophotography" element={<Astrophotography />} />
        <Route path="/guild" element={<Guild />} />
        <Route path="/guild/competitions/:id" element={<CompetitionDetail />} />
        <Route path="/ipt" element={<IPT />} />
        <Route path="/ipt/:year/:slug" element={<ProblemDetail />} />
        <Route path="/team" element={<Team />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Layout>
  )
}
