import React from 'react'
import { Card } from "../components/ui/card"
import { Button } from "../components/ui/button"
import Particles from "../components/shared/Particles"

interface LandingPageProps {
  onStartApp: () => void
}

const LandingPage: React.FC<LandingPageProps> = ({ onStartApp }) => {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#00CED1] via-[#40E0D0] to-[#FFD700] flex items-center justify-center p-4">
      <Particles />
      <Card className="w-full max-w-md bg-white/90 backdrop-blur">
        <div className="p-6 space-y-6">
          <div className="flex justify-center">
            <div className="relative">
              <div className="w-20 h-20 rounded-full bg-[#00CED1] flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-[#FFD700] flex items-center justify-center">
                  <div className="text-white text-4xl font-bold">+</div>
                </div>
              </div>
              <div className="absolute mt-4 text-center w-full">
                <span className="text-[#00CED1] font-bold text-2xl">Easy</span>
                <span className="text-[#FFD700] font-bold text-2xl">GP</span>
              </div>
            </div>
          </div>

          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold text-[#00CED1]">Premium Healthcare at Your Fingertips</h1>
            <p className="text-gray-600">Experience world-class medical care with a personalized approach that puts your wellness first.</p>
          </div>

          <div className="space-y-4">
            <Button 
              onClick={onStartApp}
              className="w-full bg-[#00CED1] hover:bg-[#00CED1]/90 text-white"
            >
              Access Application
            </Button>
            <div className="text-center text-sm text-[#00CED1]">
              Click to access the full suite of medical tools
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default LandingPage
