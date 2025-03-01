'use client' 
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { exerciseData } from '../data/excercise-data'
import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { ChevronLeft,ALargeSmall,Play, Pause, Volume2, VolumeX } from 'lucide-react'
import { useSearchParams,useRouter } from 'next/navigation'
import ThumbnailList from '../components/thumbnail-list'
import CircleTimer from '../components/circle-timer'
import { motion, AnimatePresence } from 'framer-motion'

import {store} from '../../lib/offline-storage'

// Utility function to format time
const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
}
const formatDate = (date) => {
  return date.toLocaleDateString("en-GB").replace(/\//g,"");
}
export default function VideoDetail() { 
  //  console.log(useSearchParams().get('id'));
    const searchParams = useSearchParams();
    const router = useRouter();
    const dayKey = "steps";
    const exConst = exerciseData;
    const exercise = exerciseData[dayKey]?.find(ex => ex.id === searchParams.get("id"))
    const todayVideosLength = exerciseData[dayKey].length
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
    const [opacityValue,setOpacityValue] = useState(0);
    const today = new Date();
    const [currentDate, setCurrentDate] = useState(formatDate(today));
    const [seekTime, setSeekTime]=useState(0)
    const [remainingTime, setRemainingTime] = useState(false);
    const [status,setStatus] = useState("Not Started");
    const [resetFlag,setResetFlag] = useState(false);
    const [userId,setUserId] = useState(sessionStorage.getItem("userId"))

    const [storageData,setStorageData]= useState(store.readData("play-status",userId));
    const id = searchParams.get("id");
   
    //get user id
   /* useEffect(()=>{
      if(typeof(Storage) != undefined){
        setUserId(sessionStorage.getItem("userId"));
        setStorageData(store.readData("play-status",userId));
      }
      console.log("User ID : "+storageData)
    },[userId])*/
    const fontToggle = (index) =>{
        setActiveIndex(index);
    }
    const handleLoadedMetadata = () => {
      if (videoRef.current) {
        if(status == "Completed"){
          setIsPlaying(false)
        }
        
        videoRef.current.currentTime = (seekTime>0)?seekTime:videoRef.current.currentTime;
       // setDuration(0);
        const videoDuration = videoRef.current.duration;
        setDuration(Math.round(videoDuration)) 

        setTimeout(()=>{
          //childRef.current.toggleTimer();
        },10)
      } 
    };

    const fetchData = (queryParam) => { 
    setProgress(0)
    setIsMuted(false)
    setIsPlaying(false)
    setDuration(0)
    setOpacityValue(queryParam);
  //  setCurrentId(queryParam);
    };
    useEffect(() => {
      console.log("todayVideosLength"+todayVideosLength);
      if(storageData != undefined){ 
        if(Object.hasOwn(storageData,currentDate)){
          Object.assign(storageData[currentDate],{totalNoOfExcercise:todayVideosLength});
       if(Object.hasOwn(storageData[currentDate],"id"+id)){
        
        
       // useEffect(()=>{
         setProgress(storageData[currentDate]["id"+id].progress);
           setDuration(Math.round(storageData[currentDate]["id"+id].duration));
           setSeekTime(Math.round(storageData[currentDate]["id"+id].durationInSec));
           setRemainingTime(Math.round(storageData[currentDate]["id"+id].remainingTime));
           setStatus(storageData[currentDate]["id"+id].status);
        //},[storageData])
      }
      else{
        console.log("id"+id);
        console.log(progress);
        console.log(duration);
        setProgress(0)
        setDuration(0)
        setSeekTime(0)
        setRemainingTime(0)
        setStatus("Not Started")
      }
    }
  }
        fetchData(searchParams.get("id"));
    }, [searchParams.get("id")]); // This will trigger the effect whenever the query parameters change
  

    
    const togglePlay = () => {
      if (videoRef.current) {
        if (isPlaying) {
          videoRef.current.pause()
        } else {
          videoRef.current.play()
        }
        if(status == "Completed" && !resetFlag){
          videoRef.current.currentTime = 0;
          setResetFlag(true);
        }
          
       
          console.log("before child invoke");
          childRef.current.toggleTimer(isPlaying);
        
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
          (videoRef.current.currentTime / videoRef.current.duration) * 100;

          console.log("videoRef >> "+progressPercent);
          if(videoRef.current.currentTime == 0){
            childRef.current.resetTimer();
            setTimeout(()=>{
           // childRef.current.toggleTimer();
          },10)
          }

            
       
          let status = (progressPercent == 100)?"Completed":(progressPercent == 0)?"Not Started":"Started";
          
          const videoData = {
           // "sssri19@gmail.com":{
            ["id"+searchParams.get("id")] : {
               "status" : status,
                "progress":Math.round(progressPercent),
                "duration": formatTime(videoRef.current.currentTime),
                "durationInSec":videoRef.current.currentTime,
                "remainingTime": videoRef.current.duration - videoRef.current.currentTime
          }
          //}
          }
          //store playing details
          if(store.isKeyExist("play-status")){
            let playJson = JSON.parse(localStorage.getItem("play-status"));
            console.log("playJson");
            console.log(playJson);

            if(playJson[userId] == null){
              console.log("playJson Null value");
            store.insertData("play-status",{
              [userId]:{
                 [currentDate]: videoData
               }
             });
            }

          if(playJson[userId]){
            console.log("playJson Inside");
            console.log(store.isKeyExist("play-status"));

            if(storageData != null){
              setStorageData(store.readData("play-status",userId));
            }

            if(Object.hasOwn(storageData,currentDate)){
              Object.assign(storageData[currentDate],{totalNoOfExcercise:todayVideosLength});
            if(Object.hasOwn(storageData[currentDate],"id"+id)){
              console.log("currentDate status : "+storageData[currentDate]["id"+id].status)
              if(storageData[currentDate]["id"+id].status != "Completed") {
                Object.assign(storageData[currentDate],videoData);
                store.insertData("play-status",storageData,userId);
              }
              
             
            }
            else{
              Object.assign(storageData[currentDate],videoData);
              store.insertData("play-status",storageData,userId);
           }
          }
          else{ 
            console.log("play-status today");
              //Object.assign(storageData,currentDate);
              store.insertData("play-status",{
                [currentDate]: videoData
              },userId);
          }
          }
          else{
            console.log("play else part"+ userId); 
            Object.assign(videoData,{totalNoOfExcercise:todayVideosLength});
            store.insertData("play-status",{
             [userId]:{
                [currentDate]: videoData
              }
            });
          }
        }
        else{ 
          Object.assign(videoData,{totalNoOfExcercise:todayVideosLength});
          store.createData("play-status",{
           [userId]:{
              [currentDate]: videoData
            }
          });
        }

        setProgress(progressPercent)
        if(progressPercent >= 100){
          setIsPlaying(false)
        }
      }
    }
    return (
      <>
      {storageData && <div className='flex flex-col md:flex-col-reverse'>
 
        
<ThumbnailList exerciseData={exConst.steps}/> 

      <div className="container mx-auto my-5">
        
      <div className="flex items-center mb-6">
          <h1 className="text-xl md:text-2xl font-bold">{exercise.name}</h1>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {/* Video/Image Section */}
          <motion.div
        key={`opacity-${opacityValue}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}  
      layout>
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
           {duration > 0 && <CircleTimer duration={duration} remainingTime={remainingTime == 0 && status!="Completed"?duration:remainingTime} ref={childRef}/>}
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
  
          </motion.div>
          {/* Exercise Details Section */}
          <div className="space-y-6">
           
          <motion.div
        key={`opacity-${opacityValue}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}  >
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
   </motion.div>
          </div>
        </div>
      </div>
      </div>
}
</>
    )
}

 