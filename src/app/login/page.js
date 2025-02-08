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
import { GoogleOAuthProvider,GoogleLogin} from "@react-oauth/google";
import fileOperations from "../components/file-handler"

export default function Login() { 
  console.log("Current working directory:", process.cwd());
  fileOperations();
  console.log("file operation done");
  const router = useRouter();
  const [user, setUser] = useState(null);
  const callAuth = (event) => { 
    router.push('/home');
  }

  // Callback function for successful Google login
  const handleLoginSuccess = (response) => {
    // Use the response to get user info
    const { credential } = response;
    // Decode the credential to get user info
    const userInfo = credential;
    setUser(userInfo);
    console.log(response);
    router.push('/home');
  };

  const handleLoginFailure = (error) => {
    console.log("Login failed", error);
  };

  
  return (
    <GoogleOAuthProvider clientId="67850878315-urami5ham01p0itt5qhhjibh7kqrukdj.apps.googleusercontent.com">
    <div className={`fadein-container ${fadeInEffect()} flex flex-col items-center justify-center min-h-screen p-2`}> 

      <div className='space-y-4 font-black h-96 p-0 gap-4 text-center'>
        <div><View className='text-sky-800 vq-view-width-height'/></div>
        <div className='text-4xl text-sky-800'>Vision Quest</div>
      </div>

      <GoogleLogin
          onSuccess={handleLoginSuccess}
          onError={handleLoginFailure}
        />
    
    </div>
    </GoogleOAuthProvider>
  )
}