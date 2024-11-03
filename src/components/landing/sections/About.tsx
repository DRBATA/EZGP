import React from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent } from "../../ui/card"

interface AboutProps {}

const About: React.FC<AboutProps> = () => {
  return (
    <div id="about" className="relative h-[80vh] bg-white/80 backdrop-blur-sm flex items-center justify-center">
      <div className="container mx-auto px-6">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-[#00CED1] mb-4">
            About EasyGP
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            EasyGP is a subscription-based suite of core general practice applications, providing a comprehensive, secure health management platform accessible through our website. All features are included for members, ensuring users have full access to EasyGP's tools and resources.
          </p>
        </div>
      </div>
    </div>
  )
}

export default About
