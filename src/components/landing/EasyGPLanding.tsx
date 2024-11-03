import React, { useState, useEffect } from 'react'
import MainNav from '../navigation/MainNav'
import LoginModal from '../auth/LoginModal'
import AppSuite from '../../fork/modules/suite/AppSuite'
import Particles from '../shared/Particles'
import Hero from './sections/Hero'
import Features from './sections/Features'
import Testimonials from './sections/Testimonials'
import CTA from './sections/CTA'
import Footer from './sections/Footer'
import About from './sections/About'
import { ChevronUp } from 'lucide-react'

const EasyGPLanding = () => {
  // Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [showLoginModal, setShowLoginModal] = useState(false)
  
  // Navigation state
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  // Footer state
  const [isFooterExpanded, setIsFooterExpanded] = useState(false)

  useEffect(() => {
    const savedAuth = localStorage.getItem('easyGP_auth')
    if (savedAuth === 'true') {
      setIsAuthenticated(true)
    }
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      const navHeight = 72 // Height of the fixed navigation
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
      const offsetPosition = elementPosition - navHeight

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
  }

  const toggleFooter = () => setIsFooterExpanded(prev => !prev);


  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const handleLogin = () => {
    setIsAuthenticated(true)
    localStorage.setItem('easyGP_auth', 'true')
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    localStorage.removeItem('easyGP_auth')
  }

  const easyVariants = {
    initial: { 
      opacity: 0, 
      scale: 0.5 
    },
    animate: {
      opacity: 1,
      scale: 1
    }
  }

  // If authenticated, show the app suite
  if (isAuthenticated) {
    return <AppSuite onLogout={handleLogout} onShowPayment={() => {}} />
  }

  return (
    <div className="relative min-h-screen bg-[#F0F8FF] overflow-x-hidden flex flex-col">
      <Particles className="fixed inset-0" />
      
      {/* Navigation */}
      <MainNav 
        isMenuOpen={isMenuOpen}
        toggleMenu={toggleMenu}
        onLoginClick={() => setShowLoginModal(true)}
        easyVariants={easyVariants}
        onNavigate={scrollToSection}
        isFooterExpanded={isFooterExpanded}
        toggleFooter={toggleFooter}
      />

      {/* Main Content */}
      <main className={`flex-1 overflow-auto transition-all duration-300 ${
        isFooterExpanded ? 'h-[50vh]' : 'h-full'
      }`}>
        {/* Hero Section */}
        <div id="home">
          <Hero onLoginClick={() => setShowLoginModal(true)} />
        </div>

        {/* About Section */}
        <div id="about" className="relative z-10">
          <About />
        </div>

        {/* Features Section */}
        <div id="features" className="relative z-10">
          <Features />
        </div>

        {/* Testimonials Section */}
        <div id="testimonials" className="relative z-10">
          <Testimonials />
        </div>

        {/* CTA Section */}
        <div id="cta" className="relative z-10">
          <CTA onLoginClick={() => setShowLoginModal(true)} />
        </div>

        {/* Footer - Always Visible */}
        <div 
        id="footer" 
        className={`relative z-10 transition-all duration-300 cursor-pointer ${
          isFooterExpanded ? 'h-[50vh]' : 'h-16'
        }`}
        onClick={toggleFooter}
      >
        <Footer 
          isExpanded={isFooterExpanded}
          easyVariants={easyVariants}
          setIsExpanded={setIsFooterExpanded}
        >
          <div className="flex justify-center items-center h-16">
            <ChevronUp 
              className={`w-6 h-6 transition-transform duration-300 ${
                isFooterExpanded ? 'rotate-180' : ''
              }`}
            />
          </div>
        </Footer>
      </div>
      </main>

      {/* Login Modal */}
      <LoginModal 
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onLogin={handleLogin}
      />
    </div>
  )
}

export default EasyGPLanding
