import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Stethoscope, Home, Info, Target, FileText, MessageSquare, Award } from 'lucide-react'

export interface MainNavProps {
  isFooterExpanded: boolean;
  toggleFooter: () => void;
  isMenuOpen: boolean
  toggleMenu: () => void
  onLoginClick: () => void
  easyVariants: {
    initial: { opacity: number; scale: number };
    animate: { opacity: number; scale: number };
  }
  onNavigate: (sectionId: string) => void
}

const MainNav: React.FC<MainNavProps> = ({ 
  isMenuOpen, 
  toggleMenu, 
  onLoginClick,
  easyVariants,
  onNavigate,
  isFooterExpanded,
  toggleFooter
}) => {
 
  return (
    <>
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-sm shadow-md z-50">
        <div className="container mx-auto px-6 py-3 flex justify-between items-center">
          <div className="flex items-center">
            <motion.div
              variants={easyVariants}
              initial="initial"
              animate="animate"
              className="text-[#00CED1] text-2xl font-bold flex items-center"
            >
              <button onClick={onLoginClick} className="flex items-center">
                <Stethoscope className="w-8 h-8 text-[#FFD700] mr-2" />
                Easy<span className="text-[#FFD700]">GP</span>
              </button>
            </motion.div>
          </div>
          <div className="hidden md:flex items-center space-x-6">
            {/* Top Navigation Links with Smooth Scrolling */}
            <button onClick={() => onNavigate('home')} className="flex items-center text-[#00CED1] hover:text-[#FFD700]">
              <Home className="w-5 h-5 mr-1" /> Welcome
            </button>
            <button onClick={() => onNavigate('about')} className="flex items-center text-[#00CED1] hover:text-[#FFD700]">
              <Info className="w-5 h-5 mr-1" /> About
            </button>
            <button onClick={() => onNavigate('features')} className="flex items-center text-[#00CED1] hover:text-[#FFD700]">
              <Target className="w-5 h-5 mr-1" /> Features
            </button>
            <button onClick={() => onNavigate('testimonials')} className="flex items-center text-[#00CED1] hover:text-[#FFD700]">
              <MessageSquare className="w-5 h-5 mr-1" /> Testimonials
            </button>
            <button onClick={() => onNavigate('login')} className="flex items-center text-[#00CED1] hover:text-[#FFD700]">
              <Award className="w-5 h-5 mr-1" /> Get Started
            </button>
            <button 
  onClick={toggleFooter}
  className="flex items-center text-[#00CED1] hover:text-[#FFD700]"
>
  <FileText className="w-5 h-5 mr-1" /> 
  Policies
</button>
          </div>
          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-[#00CED1]">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="fixed top-[72px] left-0 right-0 bg-white/80 backdrop-blur-sm shadow-md md:hidden z-50"
            >
              <div className="container mx-auto px-6 py-3 flex flex-col space-y-2">
                <button onClick={() => onNavigate('home')} className="flex items-center text-[#00CED1] hover:text-[#FFD700]">
                  <Home className="w-5 h-5 mr-1" /> Home
                </button>
                <button onClick={() => onNavigate('about')} className="flex items-center text-[#00CED1] hover:text-[#FFD700]">
                  <Info className="w-5 h-5 mr-1" /> About
                </button>
                <button onClick={() => onNavigate('features')} className="flex items-center text-[#00CED1] hover:text-[#FFD700]">
                  <Target className="w-5 h-5 mr-1" /> Features
                </button>
                <button onClick={() => onNavigate('testimonials')} className="flex items-center text-[#00CED1] hover:text-[#FFD700]">
                  <MessageSquare className="w-5 h-5 mr-1" /> Testimonials
                </button>
                <button onClick={() => onNavigate('login')} className="flex items-center text-[#00CED1] hover:text-[#FFD700]">
                  <Award className="w-5 h-5 mr-1" /> Get Started
                </button>
                <button onClick={() => onNavigate('documents')} className="flex items-center text-[#00CED1] hover:text-[#FFD700]">
                  <FileText className="w-5 h-5 mr-1" /> Policies
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
      {/* Spacer to prevent content from going under fixed nav */}
      <div className="h-[72px]" />
    </>
  )
}

export default MainNav
