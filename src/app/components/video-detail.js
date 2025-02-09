'use client' 
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { exerciseData } from '../data/excercise-data'
import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { ChevronLeft,ALargeSmall,Play, Pause, Volume2, VolumeX } from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import ThumbnailList from '../components/thumbnail-list'
import CircleTimer from '../components/circle-timer'

// Utility function to format time
const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
}
export default function VideoDetail() { 
  //  console.log(useSearchParams().get('id'));
    const searchParams = useSearchParams();
    const dayKey = "steps";
    const exConst = exerciseData;
    const exercise = exerciseData[dayKey]?.find(ex => ex.id === searchParams.get("id"))
    let updateFontSize = 'text-xs md:text-sm';
    const videoRef = useRef(null)
    const childRef = useRef();
    const [isPlaying, setIsPlaying] = useState(false)
    const [isMuted, setIsMuted] = useState(false)
    const [progress, setProgress] = useState(0)
    const [activeIndex, setActiveIndex] = useState(1)
    const [fSize, setFsize] = useState('text-xs md:text-sm');
    const [duration, setDuration] = useState(0)
    const [currentId, setCurrentId] = useState(1);
    const [test,setTest] = useState(0);
  
    const fontToggle = (index) =>{
        setActiveIndex(index);
    }
    const handleLoadedMetadata = () => {
      if (videoRef.current) {
        const videoDuration = videoRef.current.duration
        setDuration(Math.round(videoDuration)) 
      } 
    };

    const fetchData = (queryParam) => {
console.log("fetchData");
    setProgress(0)
    setIsMuted(false)
    setIsPlaying(false)
    setDuration(0)
    setCurrentId(queryParam);
    };
    useEffect(() => {
      console.log("previousId"+currentId);
        fetchData(searchParams.get("id"));
    }, [searchParams.get("id")]); // This will trigger the effect whenever the query parameters change
  

    useEffect(() => {
      console.log(duration);
    }, [duration]);
    // Method to get video duration
      /*let handleLoadedMetadata = () => {
        console.log("meta data");
       // setTest(20);
        console.log(test);
        if (videoRef.current) {
          const videoDuration = videoRef.current.duration
          setDuration(Math.round(videoDuration))
          console.log('Video Duration:',duration)
        }

        
    useEffect(() => {
      console.log("Count on mount:", test); // Might log 0 even after trying to update
      setTest(5); // This will schedule an update but won't affect the first log
      console.log(test);
    }, []);
      }*/

    const togglePlay = () => {
      if (videoRef.current) {
        if (isPlaying) {
          videoRef.current.pause()
        } else {
          videoRef.current.play()
        }
        console.log("before child invoke");
        childRef.current.toggleTimer();
        console.log("after child invoke");
        setIsPlaying(!isPlaying)
      }
    }
  
    const toggleMute = () => {
      if (videoRef.current) {
        videoRef.current.muted = !isMuted
        setIsMuted(!isMuted)
      }
    }
  
    const handleTimeUpdate = () => {
      if (videoRef.current) {
        const progressPercent = 
          (videoRef.current.currentTime / videoRef.current.duration) * 100
        setProgress(progressPercent)
      }
    }
    return (
      <>
      { currentId == searchParams.get("id") && <div className='flex flex-col md:flex-col-reverse'>

<ThumbnailList exerciseData={exConst.steps}/>


      <div className="container mx-auto my-5">
        
      <div className="flex items-center mb-6">
          <h1 className="text-xl md:text-2xl font-bold">{exercise.name}</h1>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {/* Video/Image Section */}
          <Card className="h-fit">
             <CardContent className="relative p-0">
              <div className="rounded-lg">
               
                <div className="max-w-2xl mx-auto p-0 bg-background shadow-lg rounded-lg">
        <div className="relative">
          <video 
            ref={videoRef}
            onTimeUpdate={handleTimeUpdate}
            className="w-full rounded-t-lg"
            src={(exercise.videoUrl.indexOf("http")!=-1)?exercise.videoUrl:process.env.PATH+exercise.videoUrl} 
            onLoadedMetadata={handleLoadedMetadata} 
          >
            Your browser does not support the video tag.
          </video>
          
          {/* Progress Bar */}
          <div 
            className="h-2 bg-primary/20 w-full"
            role="progressbar"
            aria-valuenow={progress}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <div 
              className="h-full bg-primary transition-all duration-200" 
              style={{ width: `${progress}%` }}
            />
          </div>
  
          {/* Controls */}
          <div className="flex items-center justify-between p-4 bg-secondary/10">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={togglePlay}
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? <Pause /> : <Play />}
            </Button>
           {duration > 0 && <CircleTimer duration={duration} ref={childRef}/>}
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleMute}
              aria-label={isMuted ? "Unmute" : "Mute"}
            >
              {isMuted ? <VolumeX /> : <Volume2 />}
            </Button>
          </div>
        </div>
      </div>
                {/*<div className="absolute inset-0 flex items-center justify-center bg-black/30">
                  <Button 
                    size="lg" 
                    className="rounded-full"
                    // You could add a modal or video player functionality here
                  >
                    <Play className="mr-2 h-5 w-5" /> Play Video
                  </Button>
                </div>*/}
              </div>
            </CardContent>
          </Card>
  
          {/* Exercise Details Section */}
          <div className="space-y-6">
           
  
            {/* Steps Card */}
            <Card>
              <CardHeader className="grid grid-cols-2 items-center">
                <CardTitle className="text-md md:text-2xl">Exercise Steps</CardTitle>
                <div className='fontSizeButtons flex justify-end items-center'>
                  <ALargeSmall size={32} onClick={()=>fontToggle(1)} className={`rounded-md ${(activeIndex == 1)?"bg-sky-800  text-slate-50":"bg-gray-100"} font-size-shadow p-2 m-2`}/>
                  <ALargeSmall size={36} onClick={()=>fontToggle(2)} className={`rounded-md ${(activeIndex == 2)?"bg-sky-800  text-slate-50":"bg-gray-100"}  font-size-shadow p-2 m-2`}/>
                  <ALargeSmall size={40} onClick={()=>fontToggle(3)} className={`rounded-md ${(activeIndex == 3)?"bg-sky-800  text-slate-50":"bg-gray-100"}  font-size-shadow p-2 m-2`} />
                </div>
              </CardHeader>
              <CardContent>
                <ol className="list-decimal list-inside space-y-2">
                  {exercise.steps.map((step, index) => (
                    <li key={index} className={`text-muted-foreground ${(activeIndex == 1)?updateFontSize:(activeIndex == 2)?"text-sm md:text-lg":"text-xl md:text-2xl"}`}>
                      {step}
                    </li>
                  ))}
                </ol>
              </CardContent>
            </Card>
   
          </div>
        </div>
      </div>
      </div>
}
</>
    )
}

 