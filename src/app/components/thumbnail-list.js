'use client'
import {useState} from 'react'
import {Play} from 'lucide-react'

export default function ThumbnailList({exerciseData}){
    const [activeVideo, setActiveVideo] = useState(null)
    
    return(<div className="w-full bg-slate-50 rounded-lg">
        <div className="container mx-auto px-4 py-8">
          
          {/* Horizontal Scrollable Container */}
          <div 
            className="flex overflow-x-auto space-x-4 pb-4 scrollbar-hide"
            style={{ 
              scrollSnapType: 'x mandatory',
              WebkitOverflowScrolling: 'touch'
            }}
          >
            {exerciseData.map((video) => (
              <div 
                key={video.id}
                className="flex-shrink-0 w-36 group cursor-pointer p-2 bg-emerald-100 rounded-lg"
                onMouseEnter={() => setActiveVideo(video.id)}
                onMouseLeave={() => setActiveVideo(null)}
              >
                <div className="relative rounded-lg overflow-hidden shadow-md transition-all duration-300 group-hover:scale-105">
                  {/* Thumbnail Image */}
                  <video 
                    src={video.videoUrl}
                    alt={video.name} 
                    className="w-full object-cover"
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
                  {video.duration && <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs">
                    {video.duration}
                  </div> }
                </div>
                
                {/* Video Metadata */}
                <div className="mt-2">
                  <h3 className="font-semibold text-sm line-clamp-2">{video.name}</h3>
                  <div className='grid'>
                    <p className="text-xs text-muted-foreground">
                        Duration: 30s
                    </p> 
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>)
}