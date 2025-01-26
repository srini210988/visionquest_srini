 'use client'

import { useState, useEffect } from 'react'
import {getSlogans} from "../../lib/slogans"

export function Slogan({ children }){
    const [slogans, setSlogans] = useState({});

    //set slogan
      useEffect(() => {
        const fetchData = async () => {
          const data = await getSlogans();
          setSlogans(data);
        };
        fetchData();
      },[]);

      return(
        <div>
            <p className='font-black text-sm'>"{slogans.slogan}"</p>
        <div className='text-right'><small>- {slogans.saidBy}</small></div>
        </div>
      );
}
