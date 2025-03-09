'use client'

import { useState, useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'

export default function CircleTimer({
  duration = 30,
  size = 50,
  strokeWidth = 3,
  primaryColor = 'hsl(200.95deg 90% 27.45%)',
  secondaryColor = 'hsl(199.37deg 95.49% 73.92%)'
}) {
  const [timeRemaining, setTimeRemaining] = useState(duration)
  const [isRunning, setIsRunning] = useState(false)
  const timerRef = useRef(null)

  // Calculate circle properties
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const progress = 1 - timeRemaining / duration
  const strokeDashoffset = circumference * (1 - progress)

  // Start/pause timer
  const toggleTimer = () => {
    setIsRunning(prev => !prev)
  }

  // Reset timer
  const resetTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current)
    }
    setTimeRemaining(duration)
    setIsRunning(false)
  }

  // Timer logic
  useEffect(() => {
    if (isRunning && timeRemaining > 0) {
      timerRef.current = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            clearInterval(timerRef.current)
            setIsRunning(false)
            return 0
          }
          return prev - 1
        })
      }, 1000)
    } else if (timeRemaining === 0) {
      setIsRunning(false)
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [isRunning, timeRemaining])

  // Format time
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div 
      className="flex flex-col items-center justify-center space-y-4"
      style={{ width: size, height: size }}
    >
      <div className="relative">
        {/* Background Circle */}
        <svg 
          width={size} 
          height={size} 
          viewBox={`0 0 ${size} ${size}`}
          className="transform -rotate-90"
        >
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={secondaryColor}
            strokeWidth={strokeWidth}
            className="opacity-20"
          />
        </svg>

        {/* Progress Circle */}
        <svg 
          width={size} 
          height={size} 
          viewBox={`0 0 ${size} ${size}`}
          className="absolute top-0 left-0 transform -rotate-90"
        >
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={primaryColor}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className="transition-all duration-1000 ease-linear"
          />
        </svg>

        {/* Time Display */}
        <div 
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
          text-sm font-bold text-primary"
        >
          {formatTime(timeRemaining)}
        </div>
      </div>

      {/* Control Buttons */}
      <div className="flex space-x-4">
        <button 
          onClick={toggleTimer}
          className={cn(
            "px-4 py-2 rounded-full transition-all",
            isRunning 
              ? "bg-destructive text-destructive-foreground" 
              : "bg-primary text-primary-foreground"
          )}
        >
          {isRunning ? 'Pause' : 'Start'}
        </button>
        <button 
          onClick={resetTimer}
          className="px-4 py-2 bg-secondary text-secondary-foreground rounded-full"
        >
          Reset
        </button>
      </div>
    </div>
  )
}