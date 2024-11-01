import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useAnimation, Variants } from 'framer-motion'
import { ChevronRight, Heart, Shield, Star, Lock, Menu, X, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./ui/card"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { Alert, AlertDescription } from "./ui/alert"

const EasyGPLanding = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [accessCode, setAccessCode] = useState('')
  const [error, setError] = useState('')
  const [attempts, setAttempts] = useState(0)
  const [isLocked, setIsLocked] = useState(false)
  const [lockTimer, setLockTimer] = useState(0)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const controls = useAnimation()

  useEffect(() => {
    const savedAuth = localStorage.getItem('easyGP_auth')
    if (savedAuth === 'true') {
      setIsAuthenticated(true)
    }
  }, [])

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isLocked && lockTimer > 0) {
      interval = setInterval(() => {
        setLockTimer(t => t - 1)
      }, 1000)
    } else if (lockTimer === 0) {
      setIsLocked(false)
    }
    return () => clearInterval(interval)
  }, [isLocked, lockTimer])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const particles: {
      x: number
      y: number
      radius: number
      color: string
      vx: number
      vy: number
    }[] = []
    const particleCount = 100

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 3 + 1,
        color: Math.random() > 0.5 ? '#40E0D0' : '#FFD700',
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
      })
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach((particle) => {
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
        ctx.fillStyle = particle.color
        ctx.fill()

        particle.x += particle.vx
        particle.y += particle.vy

        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1
      })

      requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (isLocked) return

    if (accessCode === 'DEMO2024') {
      setIsAuthenticated(true)
      localStorage.setItem('easyGP_auth', 'true')
      setError('')
      setAttempts(0)
    } else {
      const newAttempts = attempts + 1
      setAttempts(newAttempts)
      setError('Invalid access code')
      
      if (newAttempts >= 3) {
        setIsLocked(true)
        setLockTimer(30)
      }
      
      setAccessCode('')
    }
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const easyVariants: Variants = {
    initial: { opacity: 0, scale: 0.5, y: -50 },
    animate: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 1,
        ease: 'easeOut',
      },
    },
  }

  if (!isAuthenticated) {
    return (
      <div className="relative min-h-screen bg-gradient-to-br from-[#00CED1] via-[#40E0D0] to-[#FFD700] flex items-center justify-center p-4">
        <canvas ref={canvasRef} className="absolute inset-0" />
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="w-full max-w-md bg-white/90 backdrop-blur">
            <CardHeader className="space-y-1">
              <div className="flex justify-center mb-6">
                <motion.div
                  className="relative"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                >
                  <div className="w-20 h-20 rounded-full bg-[#00CED1] flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-[#FFD700] flex items-center justify-center">
                      <div className="text-white text-4xl font-bold">+</div>
                    </div>
                  </div>
                </motion.div>
                <div className="absolute mt-20 text-center">
                  <span className="text-[#00CED1] font-bold text-2xl">Easy</span>
                  <span className="text-[#FFD700] font-bold text-2xl">GP</span>
                </div>
              </div>
              <CardTitle className="text-2xl text-[#00CED1] flex items-center gap-2 justify-center mt-8">
                <Lock className="h-6 w-6 text-[#FFD700]" />
                Access Required
              </CardTitle>
              <CardDescription className="text-center">
                Please enter your access code to continue
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Input
                    type="password"
                    placeholder="Enter access code"
                    value={accessCode}
                    onChange={(e) => setAccessCode(e.target.value)}
                    className="border-[#00CED1] focus:border-[#FFD700] focus:ring-[#FFD700]"
                    disabled={isLocked}
                  />
                  {error && (
                    <Alert variant="destructive" className="bg-red-50">
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}
                  {isLocked && (
                    <Alert className="bg-[#FFD700]/10 border-[#FFD700] text-[#00CED1]">
                      <AlertDescription>
                        Too many attempts. Please wait {lockTimer} seconds before trying again.
                      </AlertDescription>
                    </Alert>
                  )}
                </div>
                <Button 
                  type="submit" 
                  className="w-full bg-[#00CED1] hover:bg-[#00CED1]/90 text-white"
                  disabled={isLocked || !accessCode}
                >
                  Access Application
                </Button>
                <div className="mt-4 text-center">
                  <div className="text-sm text-[#00CED1]">
                    Demo Access Code: <span className="font-mono text-[#FFD700]">DEMO2024</span>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="relative min-h-screen bg-[#F0F8FF]">
      <canvas ref={canvasRef} className="absolute inset-0" />
      
      {/* Navigation */}
      <nav className="relative bg-white/80 backdrop-blur-sm shadow-md z-10">
        <div className="container mx-auto px-6 py-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <motion.div
                variants={easyVariants}
                initial="initial"
                animate="animate"
                className="text-[#00CED1] text-2xl font-bold"
              >
                Easy<span className="text-[#FFD700]">GP</span>
              </motion.div>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <a href="#" className="text-[#00CED1] hover:text-[#FFD700]">Home</a>
              <a href="#" className="text-[#00CED1] hover:text-[#FFD700]">Services</a>
              <a href="#" className="text-[#00CED1] hover:text-[#FFD700]">About</a>
              <a href="#" className="text-[#00CED1] hover:text-[#FFD700]">Contact</a>
              <Button 
                onClick={() => {
                  setIsAuthenticated(false)
                  localStorage.removeItem('easyGP_auth')
                }}
                className="bg-[#FFD700] text-[#00CED1] hover:bg-[#FFD700]/90"
              >
                Logout
              </Button>
            </div>
            <div className="md:hidden">
              <button onClick={toggleMenu} className="text-[#00CED1]">
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="relative bg-white/80 backdrop-blur-sm shadow-md md:hidden z-10"
          >
            <div className="container mx-auto px-6 py-3 flex flex-col space-y-2">
              <a href="#" className="text-[#00CED1] hover:text-[#FFD700]">Home</a>
              <a href="#" className="text-[#00CED1] hover:text-[#FFD700]">Services</a>
              <a href="#" className="text-[#00CED1] hover:text-[#FFD700]">About</a>
              <a href="#" className="text-[#00CED1] hover:text-[#FFD700]">Contact</a>
              <Button 
                onClick={() => {
                  setIsAuthenticated(false)
                  localStorage.removeItem('easyGP_auth')
                }}
                className="bg-[#FFD700] text-[#00CED1] hover:bg-[#FFD700]/90"
              >
                Logout
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <div className="relative min-h-screen flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-r from-[#00CED1]/60 to-[#40E0D0]/60" />
        <div className="relative z-10 container mx-auto px-6 py-32 text-center">
          <motion.h1 
            className="text-5xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Premium Healthcare at Your Fingertips
          </motion.h1>
          <motion.p 
            className="text-xl text-[#F0F8FF] mb-8"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            Experience world-class medical care with a personalized approach that puts your wellness first.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Button className="bg-[#FFD700] text-[#00CED1] px-8 py-6 rounded-full font-semibold flex items-center gap-2 hover:bg-[#FFD700]/90 transition-colors text-lg">
              Schedule Consultation <ChevronRight size={24} />
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Features Section */}
      <div className="relative py-24 bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <Card className="bg-white/90 backdrop-blur-sm p-6 hover:shadow-lg transition-shadow">
                <CardContent>
                  <Heart className="w-12 h-12 text-[#00CED1] mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Personalized Care</h3>
                  <p className="text-gray-600">
                    Tailored medical solutions designed around your unique health profile and lifestyle.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="bg-white/90 backdrop-blur-sm p-6 hover:shadow-lg transition-shadow">
                <CardContent>
                  <Shield className="w-12 h-12 text-[#00CED1] mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Advanced Technology</h3>
                  <p className="text-gray-600">
                    State-of-the-art diagnostic tools and treatment methods for optimal results.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <Card className="bg-white/90 backdrop-blur-sm p-6 hover:shadow-lg transition-shadow">
                <CardContent>
                  <Star className="w-12 h-12 text-[#00CED1] mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Premium Experience</h3>
                  <p className="text-gray-600">
                    Concierge medical service with 24/7 access to your dedicated care team.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Testimonial Section */}
      <div className="relative bg-[#F0F8FF]/80 backdrop-blur-sm py-24">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-12 text-[#00CED1]">
            Trusted by Clients Worldwide
          </h2>
          <motion.div
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="bg-white/90 backdrop-blur-sm p-8 rounded-lg shadow-sm">
              <p className="text-lg text-gray-700 italic mb-6">
                "The level of care and attention to detail is unmatched. A truly exceptional medical experience."
              </p>
              <div className="flex justify-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-[#FFD700] fill-current" />
                ))}
              </div>
              <p className="text-gray-600">EasyGP Member since 2022</p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative bg-[#00CED1]/90 backdrop-blur-sm text-white py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Begin Your Journey to Premium Healthcare
          </h2>
          <Button className="bg-[#FFD700] text-[#00CED1] px-8 py-4 rounded-full font-semibold inline-flex items-center gap-2 hover:bg-[#FFD700]/90 transition-colors">
            Contact Our Team <ChevronRight size={20} />
          </Button>
        </div>
      </div>

      {/* Privacy Footer */}
      <footer className="relative bg-[#F0F8FF]/80 backdrop-blur-sm py-8">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap justify-between items-start">
            <div className="w-full md:w-1/4 mb-6 md:mb-0">
              <motion.div
                variants={easyVariants}
                initial="initial"
                animate="animate"
                className="text-[#00CED1] text-2xl font-bold mb-4"
              >
                Easy<span className="text-[#FFD700]">GP</span>
              </motion.div>
              <p className="text-sm text-gray-600 mb-4">
                Premium Healthcare at Your Fingertips
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-[#00CED1] hover:text-[#FFD700]">
                  <Facebook size={20} />
                </a>
                <a href="#" className="text-[#00CED1] hover:text-[#FFD700]">
                  <Twitter size={20} />
                </a>
                <a href="#" className="text-[#00CED1] hover:text-[#FFD700]">
                  <Instagram size={20} />
                </a>
                <a href="#" className="text-[#00CED1] hover:text-[#FFD700]">
                  <Linkedin size={20} />
                </a>
              </div>
            </div>
            <div className="w-full md:w-1/4 mb-6 md:mb-0">
              <h4 className="text-lg font-semibold mb-4 text-[#00CED1]">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-600 hover:text-[#00CED1]">Home</a></li>
                <li><a href="#" className="text-gray-600 hover:text-[#00CED1]">About Us</a></li>
                <li><a href="#" className="text-gray-600 hover:text-[#00CED1]">Services</a></li>
                <li><a href="#" className="text-gray-600 hover:text-[#00CED1]">Contact</a></li>
              </ul>
            </div>
            <div className="w-full md:w-1/4 mb-6 md:mb-0">
              <h4 className="text-lg font-semibold mb-4 text-[#00CED1]">Our Services</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-600 hover:text-[#00CED1]">Online Consultations</a></li>
                <li><a href="#" className="text-gray-600 hover:text-[#00CED1]">24/7 Support</a></li>
                <li><a href="#" className="text-gray-600 hover:text-[#00CED1]">Health Monitoring</a></li>
                <li><a href="#" className="text-gray-600 hover:text-[#00CED1]">Prescription Delivery</a></li>
              </ul>
            </div>
            <div className="w-full md:w-1/4">
              <h4 className="text-lg font-semibold mb-4 text-[#00CED1]">Privacy & Terms</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-600 hover:text-[#00CED1]">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-600 hover:text-[#00CED1]">Terms of Service</a></li>
                <li><a href="#" className="text-gray-600 hover:text-[#00CED1]">Cookie Policy</a></li>
                <li><a href="#" className="text-gray-600 hover:text-[#00CED1]">GDPR Compliance</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-200 text-center">
            <p className="text-sm text-gray-600">
              © 2024 EasyGP. All rights reserved. | Designed with care for your health and privacy.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default EasyGPLanding
