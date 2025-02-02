'use client'
import {House,ChartSpline,Settings, MonitorPlay, Activity} from "lucide-react"
import Link from "next/link";
import {usePathname } from 'next/navigation'
export function Footer({ children }){
    const pathname = usePathname()
    const isActive = (path) => pathname === path ? 'footer-active': '';
    
    return(
        <footer className="fixed bottom-1 md:bottom-3 lg-bottom-3 p-4">
            <div className="flex flex-row h-14 bg-gradient-to-r from-sky-800 from-50% to-sky-800 w-full md:w-72 lg:w-72 ">
                <ul className="flex justify-between h-14 items-center w-full p-4">
                    <li>
                        <Link href="/home" className={`inline-flex items-center ${isActive("/home")}`}>
                           <div> <House/></div>
                            <div className="footer-txt">Home</div>
                        </Link>
                    </li>

                    <li>
                        <Link href="/videos" className={`inline-flex items-center ${isActive("/videos")}`}>
                        <div> 
                        <Activity /></div>
                        <div className="footer-txt">Exercise</div>
                        </Link>
                    </li>

                    <li>
                        <Link href="/streak" className={`inline-flex items-center ${isActive("/streak")}`}>
                        <div> <ChartSpline/></div>
                        <div className="footer-txt">Streak</div>
                        </Link>
                    </li>

                    <li>
                        <Link href="/settings" className={`inline-flex items-center ${isActive("/settings")}`}>
                        <div> <Settings /></div>
                        <div className="footer-txt">Settings</div>
                        </Link>
                    </li>
                </ul>
            </div>
        </footer>
    )
}