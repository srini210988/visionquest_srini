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
import { SessionProvider } from "../context/SessionContext";
import {jwtDecode} from "jwt-decode";
 


export default function Login() { 
  console.log("Current working directory:", process.cwd()); 
  console.log("file operation done");
  const router = useRouter();
  const [user, setUser] = useState(null);
  const[store,setStorage] = useState(null);
  const[profile,setProfileStorage] = useState({});
  const[userRegister, storeUserProfile] = useState(null);
  const callAuth = (event) => { 
    router.push('/home');
  }
console.log("proce env")


  // Callback function for successful Google login
  const handleLoginSuccess = (response) => {
    // Use the response to get user info
    const { credential } = response;
    // Decode the credential to get user info
    const userInfo = credential;
    const decoded = jwtDecode(userInfo);
    setUser({
      id: decoded.sub,
      name: decoded.name,
      email: decoded.email,
      picture: decoded.picture,
    });
 
    if(typeof(Storage) != undefined){

     
      sessionStorage.setItem("authUser",userInfo);
      sessionStorage.setItem("userId",decoded.email);
      setStorage(true);
    }
    console.log("decoded");
    router.push('/home');
  };

  const handleLoginFailure = (error) => {
    console.log("Login failed", error);
  };

 

 useEffect(() => { 
  
  
  if(sessionStorage.getItem("authUser")){
  console.log("authUser")
    router.push('/home'); // Redirect to another page
    // return null;
  }
  }, []);


  useEffect(() => { 
  
    console.log(user)
    if(typeof(Storage) != undefined){
  
      if(localStorage.getItem("userProfiles")){
        setProfileStorage(JSON.parse(localStorage.getItem("userProfiles")));
      }
      else{
        localStorage.setItem("userProfiles","");
      }
        
        if(user != null && profile[user.email] == null){
          console.log("Profile does not exist.");
          profile[user.email] = { 
            name: user.name,
            email: user.email,
            picture: user.picture,
            creationDate: new Date()
          }
  
          localStorage.setItem("userProfiles",JSON.stringify(profile));
          console.log(profile);
        }
        else{
          console.log("Profile is already availble: ");
        }
      
    }
    
    }, [user]);

 
  return (
    <>
   {/*sessionStorage.getItem("authUser") == null && */<GoogleOAuthProvider clientId="67850878315-urami5ham01p0itt5qhhjibh7kqrukdj.apps.googleusercontent.com">
    
    <div className={`fadein-container flex flex-col items-center justify-center min-h-screen p-2`}> 

      <div className='space-y-4 font-black h-96 p-0 gap-4 text-center'>
        <div><View className='text-sky-800 vq-view-width-height'/></div>
        <div className='text-4xl text-sky-800'>Vision Quest</div>
      </div>

      <GoogleLogin
          onSuccess={handleLoginSuccess}
          onError={handleLoginFailure}
        />
    
    </div>
    </GoogleOAuthProvider>}
    </>
  )
}