'use client'

import { 
  useState, 
  useRef, 
  useEffect, 
  RefObject 
} from 'react'
import { Button } from '@/components/ui/button'
import { Play, Pause } from 'lucide-react'

// Utility function to format time
const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
}

export default function VideoDurationComponent() {
  // Video reference
  const videoRef = useRef<HTMLVideoElement>(null)

  // State variables
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)

  // Method to get video duration
  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      const videoDuration = videoRef.current.duration
      setDuration(videoDuration)
      console.log('Video Duration:', formatTime(videoDuration))
    }
  }

  // Update current time
  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime)
    }
  }

  // Play/Pause toggle
  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  // Seek to specific time
  const handleSeek = (time) => {
    if (videoRef.current) {
      videoRef.current.currentTime = time
    }
  }

  return (
    <div className="max-w-md mx-auto space-y-4">
      {/* Video Element */}
      <video
        ref={videoRef}
        src="/path/to/your/video.mp4"
        className="w-full rounded-lg"
        onLoadedMetadata={handleLoadedMetadata}
        onTimeUpdate={handleTimeUpdate}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />

      {/* Duration Information */}
      <div className="flex justify-between text-sm">
        <span>
          Current: {formatTime(currentTime)}
        </span>
        <span>
          Duration: {formatTime(duration)}
        </span>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div 
          className="bg-primary h-2.5 rounded-full" 
          style={{ 
            width: `${(currentTime / duration) * 100}%` 
          }}
        />
      </div>

      {/* Controls */}
      <div className="flex items-center space-x-4">
        {/* Play/Pause Button */}
        <Button 
          variant="outline" 
          size="icon"
          onClick={togglePlayPause}
        >
          {isPlaying ? <Pause /> : <Play />}
        </Button>

        {/* Seek Buttons */}
        <div className="flex space-x-2">
          <Button 
            variant="secondary" 
            size="sm"
            onClick={() => handleSeek(currentTime - 10)}
          >
            -10s
          </Button>
          <Button 
            variant="secondary" 
            size="sm"
            onClick={() => handleSeek(currentTime + 10)}
          >
            +10s
          </Button>
        </div>
      </div>

      {/* Advanced Duration Information */}
      <div className="grid grid-cols-2 gap-2 text-sm">
        <div>
          <strong>Total Duration:</strong> {duration.toFixed(2)} seconds
        </div>
        <div>
          <strong>Remaining:</strong> {(duration - currentTime).toFixed(2)} seconds
        </div>
        <div>
          <strong>Percentage Played:</strong> 
          {((currentTime / duration) * 100).toFixed(2)}%
        </div>
        <div>
          <strong>Playback Rate:</strong> 1x
        </div>
      </div>
    </div>
  )
}

// Alternative Approach with Custom Hook
function useVideoMetadata(videoRef) {
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)

  useEffect(() => {
    const videoElement = videoRef.current

    const handleLoadedMetadata = () => {
      if (videoElement) {
        setDuration(videoElement.duration)
      }
    }

    const handleTimeUpdate = () => {
      if (videoElement) {
        setCurrentTime(videoElement.currentTime)
      }
    }

    if (videoElement) {
      videoElement.addEventListener('loadedmetadata', handleLoadedMetadata)
      videoElement.addEventListener('timeupdate', handleTimeUpdate)

      return () => {
        videoElement.removeEventListener('loadedmetadata', handleLoadedMetadata)
        videoElement.removeEventListener('timeupdate', handleTimeUpdate)
      }
    }
  }, [videoRef])

  return { duration, currentTime }
}