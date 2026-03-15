import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'

import Navbar from './components/Navbar'
import Footer from './components/Footer'
import CustomCursor from './components/CustomCursor'

import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import ResearchPage from './pages/ResearchPage'
import CyberangePage from './pages/CyberRangePage'
import PeoplePage from './pages/PeoplePage'
import CollaboratorsPage from './pages/CollaboratorsPage'
import OpportunitiesPage from './pages/OpportunitiesPage'
import EventsPage from './pages/EventsPage'
import PublicationsPage from './pages/PublicationsPage'
import OpenSourcePage from './pages/OpenSourcePage'
import ContactPage from './pages/ContactPage'

function PageTransitionWrapper({ children }) {
  const location = useLocation()
  const wrapperRef = useRef(null)

  useEffect(() => {
    // Scroll to top
    window.scrollTo(0, 0)

    // Page entrance animation
    if (wrapperRef.current) {
      gsap.fromTo(wrapperRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.4, delay: 0.1, ease: 'power2.out' }
      )
    }
  }, [location.pathname])

  return <div ref={wrapperRef}>{children}</div>
}

function AnimatedRoutes() {
  const location = useLocation()

  return (
    <PageTransitionWrapper key={location.pathname}>
      <Routes location={location}>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/research" element={<ResearchPage />} />
        <Route path="/cyberrange" element={<CyberangePage />} />
        <Route path="/team" element={<PeoplePage />} />
        <Route path="/collaborators" element={<CollaboratorsPage />} />
        <Route path="/opportunities" element={<OpportunitiesPage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/publications" element={<PublicationsPage />} />
        <Route path="/opensource" element={<OpenSourcePage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </PageTransitionWrapper>
  )
}

export default function App() {
  return (
    <Router>
      <div className="page-wrapper">
        <CustomCursor />
        <Navbar />
        <AnimatedRoutes />
        <Footer />
      </div>
    </Router>
  )
}
