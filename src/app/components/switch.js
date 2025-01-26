'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import {Bell, AlarmClockPlus, Palette } from "lucide-react"

export default function Switch({ 
    checked = false, 
    onChange, 
    label, 
    disabled = false,
    className,
    size = 'md',
    color = 'blue',
    icon='Bell'
  }) {
    const [isChecked, setIsChecked] = React.useState(checked)
  
    const handleToggle = () => {
      if (disabled) return
      const newCheckedState = !isChecked
      setIsChecked(newCheckedState)
      onChange?.(newCheckedState)
    }
  
    //ICons
    const icons = {
        Bell: (<Bell/>),
        AlarmClockPlus: (<AlarmClockPlus/>),
        Palette: (<Palette/>)
    }
    // Size configurations
    const sizeConfigs = {
      sm: {
        switch: 'h-4 w-8',
        toggle: 'h-3 w-3',
        translate: 'translate-x-4'
      },
      md: {
        switch: 'h-6 w-11',
        toggle: 'h-5 w-5',
        translate: 'translate-x-5'
      },
      lg: {
        switch: 'h-8 w-14',
        toggle: 'h-6 w-6',
        translate: 'translate-x-6'
      }
    }
  
    // Color configurations
    const colorConfigs = {
      blue: {
        active: 'bg-sky-800 hover:bg-sky-800',
        inactive: 'bg-gray-200'
      },
      green: {
        active: 'bg-green-600 hover:bg-green-700',
        inactive: 'bg-gray-200'
      },
      red: {
        active: 'bg-red-600 hover:bg-red-700',
        inactive: 'bg-gray-200'
      },
      purple: {
        active: 'bg-purple-600 hover:bg-purple-700',
        inactive: 'bg-gray-200'
      }
    }
  
    const { switch: switchSize, toggle: toggleSize, translate } = sizeConfigs[size]
    const { active: activeColor, inactive: inactiveColor } = colorConfigs[color]
  
    return (
      <div className={cn("flex justify-between p-2 space-x-2 w-full", className)}>
        
        {label && (
          <label 
            className={cn(
              "text-sm font-bold inline-flex items-center ",
              disabled ? "text-gray-400" : "text-gray-700 dark:text-gray-300"
            )}
          >
            {icons[icon]} <span className='px-2'>{label}</span>
          </label>
        )}
        
        <button
          type="button"
          role="switch"
          aria-checked={isChecked}
          aria-disabled={disabled}
          onClick={handleToggle}
          className={cn(
            `relative inline-flex ${switchSize} flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-${color}-500 focus:ring-offset-2`,
            isChecked ? activeColor : inactiveColor,
            disabled && "cursor-not-allowed opacity-50"
          )}
        >
          <span 
            className={cn(
              `pointer-events-none inline-block ${toggleSize} transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`,
              isChecked ? translate : "translate-x-0"
            )}
          />
        </button>
      </div>
    )
  }