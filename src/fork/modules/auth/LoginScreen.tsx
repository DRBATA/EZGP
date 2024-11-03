import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../../../components/ui/card"
import { Input } from "../../../components/ui/input"
import { Button } from "../../../components/ui/button"
import { Alert, AlertDescription } from "../../../components/ui/alert"
import { Lock } from 'lucide-react'
import Particles from "../../../components/shared/Particles"

interface LoginScreenProps {
  onLogin: () => void
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  const [accessCode, setAccessCode] = useState('')
  const [error, setError] = useState('')
  const [attempts, setAttempts] = useState(0)
  const [isLocked, setIsLocked] = useState(false)
  const [lockTimer, setLockTimer] = useState(0)

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (isLocked) return

    if (accessCode === 'DEMO2024') {
      onLogin()
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

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#00CED1] via-[#40E0D0] to-[#FFD700] flex items-center justify-center p-4">
      <Particles />
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

export default LoginScreen
