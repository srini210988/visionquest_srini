'use client'
import { useEffect, useState } from 'react'
import React, { createContext, useState, useContext, useEffect } from 'react'

 

const ProgressContext = createContext()

export const ProgressProvider = ({ children }) => {
  
  const [progress, setProgress] = useState(() => {
   
    // Initialize from localStorage or default values]
    const [savedProgress, setStreak] = useState(0)

  useEffect(() => {
    // Safely access localStorage only on the client-side
    const savedStreak = localStorage.getItem('exerciseProgress')
    if (savedStreak) {
      setStreak(parseInt(savedStreak, 10))
    }
  }, [])
    
    return savedProgress 
      ? JSON.parse(savedProgress)
      : {
          completedExercises: [],
          dailyCompletions: {},
          currentStreak: 0,
          longestStreak: 0
        }
  })

  // Save progress to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('exerciseProgress', JSON.stringify(progress))
  }, [progress])
  const markExerciseComplete = (day, exerciseId) => {
    setProgress(prevProgress => {
      // Prevent duplicate exercise completions
      if (prevProgress.completedExercises.includes(`${day}-${exerciseId}`)) {
        return prevProgress
      }

      // Update completed exercises
      const newCompletedExercises = [
        ...prevProgress.completedExercises, 
        `${day}-${exerciseId}`
      ]

      // Update daily completions
      const newDailyCompletions = {
        ...prevProgress.dailyCompletions,
        [day]: [...(prevProgress.dailyCompletions[day] || []), exerciseId]
      }

      // Calculate streak
      const today = new Date().toISOString().split('T')[0]
      const lastCompletedDay = Object.keys(newDailyCompletions).pop()
      
      let newCurrentStreak = prevProgress.currentStreak
      let newLongestStreak = prevProgress.longestStreak

      if (lastCompletedDay === today) {
        newCurrentStreak++
        newLongestStreak = Math.max(newCurrentStreak, newLongestStreak)
      }

      return {
        completedExercises: newCompletedExercises,
        dailyCompletions: newDailyCompletions,
        currentStreak: newCurrentStreak,
        longestStreak: newLongestStreak
      }
    })
  }

  const resetProgress = () => {
    setProgress({
      completedExercises: [],
      dailyCompletions: {},
      currentStreak: 0,
      longestStreak: 0
    })
  }
console.log(resetProgress)
  
  return (
    <ProgressContext.Provider value={{ 
      progress, 
      markExerciseComplete,
      resetProgress 
    }}>
      {children}
    </ProgressContext.Provider>
  )
}

// Custom hook to use the progress context
export const useProgress = () => {
  const context = useContext(ProgressContext)
  if (context === undefined) {
    throw new Error('useProgress must be used within a ProgressProvider')
  }
  return context
}