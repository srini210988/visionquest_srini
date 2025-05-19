'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Progress } from '@/components/ui/progress'
import { Button } from "@/components/ui/button"
import { buttonVariants } from "@/components/ui/button"
import { Moon, MoonIcon, Sun, BellDot, View } from "lucide-react"
import {Slogan} from "./components/slogan"
import {getSlogans} from "../lib/slogans"


export default function RedirectCountdown({ 
  destination = '/login', 
  delay = 5000 
}) {
  const[fadeIn, setFadeIn] = useState(false);
  const [countdown, setCountdown] = useState(delay / 1000)
  const [progress, setProgress] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const [slogans, setSlogans] = useState({});
  const router = useRouter()
  
  //set slogan
  useEffect(() => {
    const fetchData = async () => {
      const data = await getSlogans();
      setSlogans(data);
    };

    fetchData();
  },[]);
  //fade
  useEffect(() => { 
    const timer = setTimeout(() => setIsVisible(true), 100)
    return () => clearTimeout(timer)
  },[])

  useEffect(() => { 
    // Countdown timer
    const countdownInterval = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(countdownInterval)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    // Progress bar
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          if(sessionStorage.getItem("authUser")){
               router.push('/home'); 
           }
           else{
          router.push(destination) 
        }
          return 100
        }
        return prev + (100 / (delay / 1000))
      })
    }, 1000)

    // Cleanup intervals
    return () => {
      clearInterval(countdownInterval)
      clearInterval(progressInterval)
    }
  }, [destination, delay, router])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-2"> 

      <div className='space-y-4 font-black h-48 p-0 gap-4 text-center'>
        <div><View className='text-sky-800 vq-view-width-height'/></div>
        <div className='text-4xl text-sky-800'>Vision Quest</div>
      </div>

      <div className= {`
          opacity-0 
          transform 
          transition-all 
          duration-1000 
          ease-out h-48 p-4
          ${isVisible ? 'opacity-100 translate-y-0' : 'translate-y-4'}
        `}>
          <h3 className='quote-of-the-day-label text-center text-cyan-800 font-black'>Quote of the day:</h3>
          <Slogan/>
          </div>

      <div className="w-full max-w-md space-y-4 text-center">
      
        <h1 className="text-sm font-bold">
          Redirecting in {countdown} seconds
        </h1>
        <Progress value={progress} className="w-1/2 bg-cyan-800 h-2 mx-auto"  data-state="intermediate"/> 
        <p className="text-center text-muted-foreground"> 
        </p>
      </div>
    </div>
  )
}