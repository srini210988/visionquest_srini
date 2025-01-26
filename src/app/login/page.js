'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Progress } from '@/components/ui/progress'
import { Button } from "@/components/ui/button"
import { buttonVariants } from "@/components/ui/button"
import { Moon, MoonIcon, Sun, BellDot, View } from "lucide-react"
import { useActionState } from 'react';
import { fadeInEffect } from '../components/fadein'
import Image from "next/image"

export default function Login() { 
  const router = useRouter();
   
  const callAuth = (event) => { 
    router.push('/home');
  }

  
  return (
    <div className={`fadein-container ${fadeInEffect()} flex flex-col items-center justify-center min-h-screen p-2`}> 

      <div className='space-y-4 font-black h-96 p-0 gap-4 text-center'>
        <div><View className='text-sky-800 vq-view-width-height'/></div>
        <div className='text-4xl text-sky-800'>Vision Quest</div>
      </div>

      

      <div className="flex justify-center space-y-4 p-2 bg-slate-100 rounded-md w-100 md:w-1/3 lg:w-1/4" onClick={callAuth}>
      <div className="p-2 px-0"><Image src={`${process.env.PATH}/gmail-ico.png`} alt="Sign In" width={36} height={36} /></div>
       <div className='text-sm font-black px-2'>Sign in with Google</div>
      </div>
    </div>
  )
}