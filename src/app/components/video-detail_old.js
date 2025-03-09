'use client' 
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { exerciseData } from '../data/excercise-data'
import { useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { ChevronLeft,ALargeSmall,Play, Pause, Volume2, VolumeX } from 'lucide-react'



export default async function VideoDetail({ 
  searchParams 
}) {
  const dayKey = "steps";
  const exercise = exerciseData[dayKey]?.find(ex => ex.id === searchParams.id)
  let updateFontSize = 'text-xs md:text-sm';
  const videoRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [progress, setProgress] = useState(0)

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
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
    <div>
    <div className="container mx-auto p-4">
    <div className="flex items-center mb-6">
        <h1 className="text-xl md:text-2xl font-bold">{exercise.name}</h1>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        {/* Video/Image Section */}
        <Card className="h-fit">
           <CardContent className="relative p-0">
            <div className="bg-muted rounded-lg overflow-hidden h-56">
             
              <div className="max-w-2xl mx-auto p-4 bg-background shadow-lg rounded-lg">
      <div className="relative">
        <video 
          ref={videoRef}
          onTimeUpdate={handleTimeUpdate}
          className="w-full rounded-t-lg"
          src={process.env.PATH+exercise.videoUrl} 
          poster="/placeholder.svg?height=720&width=1280"
        >
          Your browser does not support the video tag.
        </video>
        
        {/* Progress Bar */}
        <div 
          className="h-1 bg-primary/20 w-full"
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
                <ALargeSmall size={28} className='rounded-full bg-sky-800  text-slate-50 font-size-shadow p-2'/>
                <ALargeSmall size={32} className='rounded-full bg-white-600  font-size-shadow p-2'/>
                <ALargeSmall size={38} className='rounded-full bg-white-600  font-size-shadow p-2' />
              </div>
            </CardHeader>
            <CardContent>
              <ol className="list-decimal list-inside space-y-2">
                {exercise.steps.map((step, index) => (
                  <li key={index} className={`text-muted-foreground ${updateFontSize}`}>
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
  )
}

 