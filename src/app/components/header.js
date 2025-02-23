'use client'
import { FaBell } from "react-icons/fa";
import {Bell,CircleUserRound,View, Star,Heart} from "lucide-react"
import { RxAvatar } from "react-icons/rx";
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation'
import {jwtDecode} from "jwt-decode";
import Image from 'next/image'
import Dropdown from "../components/drop-down-menu"

export function Header(){
    const [user, setUser] = useState({});
    const router = useRouter();
    
     useEffect(() => {
        if(typeof("Storage") != undefined && sessionStorage.authUser != undefined){
         const decoded = jwtDecode(sessionStorage.getItem("authUser"));
            console.log(decoded);
            setUser({
              id: decoded.sub,
              name: decoded.name,
              email: decoded.email,
              picture: decoded.picture,
            });
        }
        else{
            router.push("/login");
        }
      }, []); 
     
      function signOut(){
       // router.push("/login");
       console.log("signed out");
        setUser({});
        if(typeof(Storage) != undefined){

            sessionStorage.removeItem("authUser")
          }
        router.push("/login");
      }

    return(
        <header className="container-fluid  bg-white shadow shadow-emerald-300/20 px-4 md:px-8 lg:px-8">
            <div className="flex flex-row items-center h-14 md:h-20 lg:h-20">
                <div className="basis-1/2 vq-logo-wrap">
                <div className='flex items-center font-bold p-0'>
                    <div><View className='text-sky-800' width="36" height="36"/></div>
                    <div className='text-base text-sky-800 px-1'>Vision Quest</div>
                </div>
                </div>
                <div className="basis-1/2 vq-header-content flex flex-row-reverse space-2 items-center">
                    <div className="w-8">{user.picture?<Dropdown profileImage={user.picture} profileEmail={user.email} profileName={user.name} signOut={signOut}/>: <CircleUserRound className="text-sky-800" />}</div>
                    <div className="px-4"><Bell className="text-yellow-500" strokeWidth={1} fill={"hsl(45.4deg 93.39% 47.45%)"}/></div>
                    <div><Star className="text-orange-700" fill="hsl(17.5 88.3% 40.4%)"/></div>
                </div>
            </div>

           
        </header>
    )
}