import React from 'react'
import { motion } from 'framer-motion'
import { Heart, Shield, Star } from 'lucide-react'
import { Card, CardContent } from "../../ui/card"

export interface FeaturesProps {}

const Features: React.FC<FeaturesProps> = () => {
  const features = [
    {
      icon: Heart,
      title: "Monitoring Apps",
      description: "Track various health metrics, such as heart risk, emotional well-being, and fitness."
    },
    {
      icon: Shield,
      title: "Secure Data Management", 
      description: "Your health data is stored securely in user-owned JSON files with PIN protection."
    },
    {
      icon: Star,
      title: "Comprehensive Tools",
      description: "Access a complete suite of general practice applications with your subscription."
    }
  ]

  return (
    <div id="features" className="relative h-[80vh] bg-[#F0F8FF]/80 backdrop-blur-sm flex items-center justify-center">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#00CED1] mb-4">
            Our Features
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="bg-white/90 backdrop-blur-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                <CardContent className="p-8">
                  <feature.icon className="w-16 h-16 text-[#00CED1] mb-4 mt-6" />
                  <h3 className="text-xl font-semibold mb-4 text-gray-800">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Features
