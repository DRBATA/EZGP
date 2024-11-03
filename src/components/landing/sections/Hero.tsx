import React from 'react'
import { motion } from 'framer-motion'
import { ChevronRight } from 'lucide-react'
import { Button } from "../../ui/button"

interface HeroProps {
  onLoginClick: () => void
}

const Hero: React.FC<HeroProps> = ({ onLoginClick }) => {
  return (
    <section id="home" className="relative h-[calc(100vh-72px)] flex items-center justify-center">
      <div className="absolute inset-0 bg-gradient-to-r from-[#00CED1]/60 to-[#40E0D0]/60" />
      <div className="relative z-10 container mx-auto px-6 text-center">
        <motion.h1 
          className="text-5xl md:text-6xl font-bold text-white mb-8"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Empowering Your Health Journey
        </motion.h1>
        <motion.p 
          className="text-xl md:text-2xl text-[#F0F8FF] mb-12 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          Take control of your health with personalized tools designed to keep you safe and informed.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="flex justify-center"
        >
          <Button 
            onClick={onLoginClick}
            className="bg-[#FFD700] text-[#00CED1] px-8 py-6 rounded-full font-semibold flex items-center gap-2 hover:bg-[#FFD700]/90 transition-colors text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            Get Started <ChevronRight size={24} />
          </Button>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero
