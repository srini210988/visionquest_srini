'use client'
import {useEffect,useState,useRef} from 'react'
import {Play} from 'lucide-react'
import { useRouter,useSearchParams } from 'next/navigation'
// Utility function to format time
const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
}
export default function ThumbnailList({exerciseData}){
  const router = useRouter();
    const searchParams = useSearchParams();
    const [activeVideo, setActiveVideo] = useState(null)
    const [duration,setDuration ] = useState(0);
    const videoRef = useRef(null);
    const [videoDurations, setVideoDurations] = useState([]);
    const [durationFlag,isDurationSet]=useState(false)


useEffect(()=>{
  isDurationSet(true);
},[videoDurations])

    const playClickedVideo = (id) => {
      console.log("clicked",id);
      router.push(`/exercise?id=${id}&format=all`);
    }
    const handleLoadedMetadata = (event,index) => {
      // if (videoRef.current) {
 console.log("loaded");
        // const videoDuration = videoRef.current.duration
        const duration = event.target.duration;
     console.log(`Video ${index + 1} duration: ${duration}`);
         //setDuration(Math.round(videoDuration)) 
         // Update the state with the duration for the specific video
         setVideoDurations(prevDurations => {
           const updatedDurations = [...prevDurations];
           updatedDurations[index] = Math.round(duration);
           return updatedDurations;
         });
       //} 
     };

    return(<div className="md:grid md:grid-cols-2"> 
        <div className="container mx-auto px-2 py-4 bg-slate-50 rounded-lg">
          {/* Horizontal Scrollable Container */}
          <div 
            className="flex overflow-x-auto space-x-4  scrollbar-hide"
            style={{ 
              scrollSnapType: 'x mandatory',
              WebkitOverflowScrolling: 'touch'
            }}
          >
            {exerciseData.map((video,index) => (
              <div 
                key={video.id}
                className={`flex-shrink-0 w-28 group cursor-pointer p-2 ${searchParams.get("id") == video.id?"bg-sky-950 text-slate-100":"bg-emerald-100"} rounded-lg`}
                onMouseEnter={() => setActiveVideo(video.id)}
                onMouseLeave={() => setActiveVideo(null)}
                onClick={()=>playClickedVideo(video.id)}
              >
                <div className="relative rounded-lg overflow-hidden shadow-md transition-all duration-300 group-hover:scale-105">
                  {/* Thumbnail Image */}
                  <video 
                    src={process.env.PATH+video.videoUrl}
                    alt={video.name} 
                    className="w-full object-cover"
                    onLoadedMetadata={(e) => handleLoadedMetadata(e,index)} 
                  ></video>
                  
                  {/* Overlay */}
                  {activeVideo === video.id && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <Play 
                        className="text-white w-6 h-6 opacity-80 hover:opacity-100 transition-opacity" 
                        strokeWidth={2} 
                      />
                    </div>
                  )}
                  
                  {/* Duration Badge */}  
                 {durationFlag &&  <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs">
                     { formatTime(videoDurations[index]) }
                  </div>}
                </div>
                
                {/* Video Metadata */}
                <div className="mt-2">
                  <h3 className="font-semibold text-sm line-clamp-2">{video.name}</h3>
                 {/* <div className='grid'>
                    <p className="text-xs text-muted-foreground">
                        Duration: 30s
                    </p> 
                  </div> */}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>)
}