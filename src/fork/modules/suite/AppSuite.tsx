import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent } from "../../../components/ui/card"
import { Button } from "../../../components/ui/button"
import SparklingParticleLogoAnimation from '../../../components/shared/SparklingParticleLogoAnimation'

interface AppSuiteProps {
  onLogout: () => void
  onShowPayment: () => void
}

const AppSuite: React.FC<AppSuiteProps> = ({ onLogout, onShowPayment }) => {
  const [showAnimation, setShowAnimation] = useState(true)

  if (showAnimation) {
    return <SparklingParticleLogoAnimation onAnimationComplete={() => setShowAnimation(false)} />
  }

  return (
    <div className="relative min-h-screen bg-[#F0F8FF]">
      {/* Navigation */}
      <nav className="relative bg-white/80 backdrop-blur-sm shadow-md z-10">
        <div className="container mx-auto px-6 py-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <div className="text-[#00CED1] text-2xl font-bold">
                Easy<span className="text-[#FFD700]">GP</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button 
                onClick={onLogout}
                className="bg-[#FFD700] text-[#00CED1] hover:bg-[#FFD700]/90"
              >
                Logout
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Suite Section */}
      <motion.div 
        className="container mx-auto px-6 py-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Monitoring Apps */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="bg-white/90 backdrop-blur-sm hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-[#00CED1] mb-4">Monitoring Apps</h3>
                <ul className="space-y-2 mb-4">
                  <li>• Heart Risk Monitor</li>
                  <li>• Emotional Well-being Tracker</li>
                  <li>• Fitness Tracker</li>
                </ul>
                <Button 
                  onClick={onShowPayment}
                  className="w-full bg-[#00CED1] hover:bg-[#00CED1]/90 text-white"
                >
                  Get Access
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Diagnostic Apps */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="bg-white/90 backdrop-blur-sm hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-[#00CED1] mb-4">Diagnostic Apps</h3>
                <ul className="space-y-2 mb-4">
                  <li>• Data Analysis</li>
                  <li>• Risk Assessment</li>
                  <li>• Health Insights</li>
                </ul>
                <Button 
                  onClick={onShowPayment}
                  className="w-full bg-[#00CED1] hover:bg-[#00CED1]/90 text-white"
                >
                  Get Access
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Free Apps */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="bg-white/90 backdrop-blur-sm hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-[#00CED1] mb-4">Free Apps</h3>
                <ul className="space-y-2 mb-4">
                  <li>• JSON Update App</li>
                  <li>• Notification App</li>
                  <li>• Basic Health Tools</li>
                </ul>
                <Button 
                  className="w-full bg-[#FFD700] hover:bg-[#FFD700]/90 text-[#00CED1]"
                >
                  Access Now
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Triage Bots */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="bg-white/90 backdrop-blur-sm hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-[#00CED1] mb-4">Triage Bots</h3>
                <ul className="space-y-2 mb-4">
                  <li>• General Triage Bot</li>
                  <li>• Strep Bot</li>
                  <li>• Health Advisory Bot</li>
                </ul>
                <Button 
                  onClick={onShowPayment}
                  className="w-full bg-[#00CED1] hover:bg-[#00CED1]/90 text-white"
                >
                  Get Access
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Health Library */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card className="bg-white/90 backdrop-blur-sm hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-[#00CED1] mb-4">Health Library</h3>
                <ul className="space-y-2 mb-4">
                  <li>• Medical Resources</li>
                  <li>• Health Guides</li>
                  <li>• Research Papers</li>
                </ul>
                <Button 
                  onClick={onShowPayment}
                  className="w-full bg-[#00CED1] hover:bg-[#00CED1]/90 text-white"
                >
                  Get Access
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* OTC Medication Apps */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Card className="bg-white/90 backdrop-blur-sm hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-[#00CED1] mb-4">OTC Medication Apps</h3>
                <ul className="space-y-2 mb-4">
                  <li>• OTC Med Checker</li>
                  <li>• Medication Chooser</li>
                  <li>• Safety Verification</li>
                </ul>
                <Button 
                  onClick={onShowPayment}
                  className="w-full bg-[#00CED1] hover:bg-[#00CED1]/90 text-white"
                >
                  Get Access
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </motion.div>

      {/* Footer */}
      <footer className="bg-white/80 backdrop-blur-sm py-8 mt-12">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <p className="text-sm text-gray-600">
              © 2024 EasyGP. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default AppSuite
