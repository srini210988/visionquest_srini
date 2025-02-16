'use client'

import Image from 'next/image'
import { ChevronRight,CirclePlay } from 'lucide-react'
import { Progress } from '@/components/ui/progress'
import { useRouter } from 'next/navigation'
import { exerciseData } from '../data/excercise-data'
import applicationConfiguration from '../../../app.config'
import {store} from '../../lib/offline-storage'



// Sample data for the list
const listData = [
  {
    id: 1,
    title: 'Eye Excercise - Excercise 1',
    description: 'Modern web solutions using Next.js and React',
    videoPath: '/videos/all/sample-5s.mp4',
    tag: '',
    status: 'Inprogress',
    progress: 20
  },
  {
    id: 2,
    title: 'Eye Excercise - Excercise 2',
    description: 'Intuitive and responsive mobile application interfaces',
    videoPath: 'https://www.w3schools.com/html/mov_bbb.mp4',
    tag: '',
    status: 'Not Started',
    progress: 0
  },
  {
    id: 3,
    title: 'Eye Excercise - Excercise 3',
    description: 'Scalable and secure cloud infrastructure',
    videoPath: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    status: 'Completed',
    progress: 100

  },
  {
    id: 4,
    title: 'Eye Excercise - Excercise 4',
    description: 'Modern web solutions using Next.js and React',
    videoPath: '/videos/all/sample-5s.mp4',
    tag: '',
    status: 'Inprogress',
    progress: 20
  },
  {
    id: 5,
    title: 'Eye Excercise - Excercise 5',
    description: 'Intuitive and responsive mobile application interfaces',
    videoPath: '/videos/all/sample-5s.mp4',
    tag: '',
    status: 'Inprogress',
    progress: 10
  }
]

const formatDate = (date) => {
  return date.toLocaleDateString("en-GB").replace(/\//g,"");
}
// List Item Component
function ListItem({ 
  id,
  name, 
  description, 
  videoUrl, 
  tag,
  progress,
  status 
}) {

  const router = useRouter();
  const storageData = store.readData("play-status",formatDate(new Date()));
  if(storageData && storageData["id"+id]){
    progress = storageData["id"+id].progress;
    status = storageData["id"+id].status;
  } 
 const handleNavigateAndPlayVideo = (vID) =>{
    console.log("hi"+vID);
    router.push("/exercise?id="+vID+"&format=all");
  }
  console.log(process.env.PATH)
  return (
    <div className="flex items-center space-x-4 my-4 md:mx-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 group list-videos">
      {/* Image */}
      <div className="flex-shrink-0">
        <video 
          src={(videoUrl.indexOf("http") != -1)?videoUrl:process.env.PATH+videoUrl}
          alt={name} 
          width={100} 
          height={100} 
          className="w-10 h-10 md:w-20 md:h-20 lg:w-20 lg:h-20 object-cover rounded-lg"
        ></video>
      </div>
      
      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center space-x-2">
          <h3 className="text-sm md:text-lg lg:text-lg font-semibold text-sky-800 dark:text-white truncate">
            {name}
          </h3>
          {tag && (
            <span className="px-2 py-0.5 text-xs font-medium text-blue-800 bg-blue-100 rounded-full">
              {tag}
            </span>
          )}
        </div>
      { /*<p className="text-sm text-gray-500 dark:text-gray-400 truncate">
          {description}
        </p> */}
       {<div className='flex items-center'>
            <Progress value={(progress==null)?0:progress} className="w-1/4 bg-sky-800 h-1 "  data-state="intermediate"/> 
            <small className='px-1 text-xs md:text-sm lg:text-sm font-bold'>{(progress==null)?0:progress}% <small><b></b></small></small>
        </div>}
        <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
         <b className='text-slate-900'>Status: </b> <span className={`${status=="Started" ? "text-amber-600": status=="Completed" ? "text-green-600":""}`}>{status==null?"Not Started": status}</span>
        </p>
      </div>
      
      {/* Action Icon */}
      <div onClick={()=>handleNavigateAndPlayVideo(id)}> 
        <CirclePlay 
          className="text-gray-400 group-hover:text-blue-500 transition-colors" 
          size={24} 
        />
      </div>
    </div>
  )
}

// Main List Component
export default function ListComponent({heading, listContent=exerciseData.steps}) {
  return (
    <div className="container mx-auto px-0 md:px-4 lg:px-4 py-2 md:py-2 lg:py-2">
      {heading && <h2 className="text-1xl md:text-2xl lg:text-2xl font-bold mb-6 text-gray-900 dark:text-white">
       {heading } 
      </h2>}
      
      {/* List Container */}
      <div className="md:grid md:grid-cols-2">
        {listContent.map((item) => (
          <ListItem 
            key={item.id}
            {...item}
          />
        ))}
      </div>
    </div>
  )
}

// Variant with Different Layout
export function CompactListComponent() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
        Compact List View
      </h2>
      
      {/* Compact Horizontal List */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {listData.map((item) => (
          <div 
            key={item.id} 
            className="flex flex-col items-center text-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <Image 
              src={item.image} 
              alt={item.title} 
              width={80} 
              height={80} 
              className="mb-4 rounded-full"
            />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {item.title}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}