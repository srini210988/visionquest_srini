'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ChevronLeft, ChevronRight } from 'lucide-react'

// Utility function to get week dates
function getWeekDates(Date) {
  const start = new Date(Date)
  
  start.setDate(start.getDate() - start.getDay())
  
  return Array.from({ length: 7 }, (_, i) => {
    console.log("startdate : "+start)
    const date = new Date(start)
    date.setDate(start.getDate() + i)
    return date
  })
}

export default function WeeklyCalendarControl() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const weekDates = getWeekDates(currentDate) 
  const handlePreviousWeek = () => {
    const newDate = new Date(currentDate)
    newDate.setDate(newDate.getDate() - 7)
    setCurrentDate(newDate)
  }

  const handleNextWeek = () => {
    const newDate = new Date(currentDate)
    newDate.setDate(newDate.getDate() + 7)
    setCurrentDate(newDate)
  }

  // Format date for display
  const formatDate = (Date) => {
    return Date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    })
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-4">
          <Button 
            variant="outline" 
            size="icon" 
            onClick={handlePreviousWeek}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          
          <div className="flex-grow mx-4 grid grid-cols-7 gap-2">
            {weekDates.map((date, index) => (
              <div 
                key={index} 
                className={`text-center p-2 rounded-md ${
                  date.toDateString() === new Date().toDateString() 
                    ? 'bg-primary text-primary-foreground' 
                    : 'hover:bg-accent'
                }`}
              >
                <div className="text-xs font-semibold">
                  {date.toLocaleDateString('en-US', { weekday: 'short' })}
                </div>
                <div className="text-sm">
                  {date.getDate()}
                </div>
              </div>
            ))}
          </div>
          
          <Button 
            variant="outline" 
            size="icon" 
            onClick={handleNextWeek}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="text-center text-sm text-muted-foreground">
          Week of {formatDate(weekDates[0])} - {formatDate(weekDates[6])}
        </div>
      </CardContent>
    </Card>
  )
}