'use client'

import React from 'react'
import { cn } from "@/lib/utils"

interface ProgressBarProps {
  value: number
  max?: number
  className?: string
}

export function ProgressBar({ 
  value, 
  max = 100, 
  className 
}: ProgressBarProps) {
  // Ensure value is within bounds
  const clampedValue = Math.max(0, Math.min(value, max))

  return (
    <div 
      role="progressbar"
      aria-valuenow={clampedValue}
      aria-valuemin={0}
      aria-valuemax={max}
      className={cn(
        "w-full h-2 bg-secondary rounded-full overflow-hidden",
        className
      )}
    >
      <div 
        className="h-full bg-primary transition-all duration-300 ease-in-out"
        style={{ 
          width: `${(clampedValue / max) * 100}%`,
          // Fallback for browsers with limited CSS support
          maxWidth: `${(clampedValue / max) * 100}%`
        }}
      />
    </div>
  )
}