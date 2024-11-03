import React from 'react'
import { ChevronRight } from 'lucide-react'
import { Button } from "../../ui/button"

interface CTAProps {
  onLoginClick: () => void
}

const CTA: React.FC<CTAProps> = ({ onLoginClick }) => {
  return (
    <div id="login" className="relative bg-[#00CED1]/90 backdrop-blur-sm text-white h-[80vh] flex items-center justify-center">
      <div className="absolute inset-0 bg-gradient-to-r from-[#00CED1]/20 to-[#40E0D0]/20" />
      <div className="container mx-auto px-6 text-center relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold mb-8">
          Begin Your Journey to Premium Healthcare
        </h2>
        <p className="text-xl md:text-2xl mb-12 text-white/90 max-w-3xl mx-auto">
          Join thousands of satisfied patients who have transformed their healthcare experience with EasyGP.
        </p>
        <Button 
          onClick={onLoginClick}
          className="bg-[#FFD700] text-[#00CED1] px-8 py-6 rounded-full font-semibold inline-flex items-center gap-2 hover:bg-[#FFD700]/90 transition-colors text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1"
        >
          Get Started Today <ChevronRight size={20} />
        </Button>
      </div>
    </div>
  )
}

export default CTA
