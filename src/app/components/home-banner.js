'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const bannerSlides = [
  {
    title: 'Quotes fo the Day',
    subtitle: 'To succeed in your mission, you must have single-minded devotion to your goal',
    author: 'Dr. A.P.J. Abdul Kalam'/*,
    buttonText: 'Shop Now'*/
  }
]

export default function HomeBannerCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % bannerSlides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + bannerSlides.length) % bannerSlides.length)
  }

  return (
    <div className="relative w-full h-[200px] md:h-[500px] overflow-hidden mb-4 rounded-2xl bg-cyan-800">
      {bannerSlides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {slide.image && <Image
            src={slide.image}
            alt={slide.title}
            fill
            priority
            className="object-cover w-full h-full"
          />}
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <div className="text-center text-white max-w-xl px-4">
              <h1 className="text-md md:text-5xl font-bold mb-4 text-md md:text-lg">{slide.title}</h1>
              <p className="text-sm md:text-2xl mb-6 text-md">{slide.subtitle}
              {slide.author && <small className='block text-right text-xs md:text-lg mt-2 text-cyan-400'>-{slide.author} </small>} 
              </p>
             
              {slide.buttonText && <Button size="lg" variant="default">
                {slide.buttonText}
              </Button>}
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Controls */}
      {bannerSlides.length > 1 && <>
      <Button
        onClick={prevSlide}
        variant="outline"
        size="icon"
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-sky-800 text-white hover:bg-white rounded-full h-6 w-6 md:h-10 md:w-10"
      >
        <ChevronLeft className="h-2 w-2 md:h-6 md:w-6" />
      </Button>
      <Button
        onClick={nextSlide}
        variant="outline"
        size="icon"
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 hover:bg-white bg-sky-800 text-white h-6 w-6 md:h-10 md:w-10 rounded-full"
      >
        <ChevronRight className="h-6 w-6" />
      </Button> 

      
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {bannerSlides.map((_, index) => (
          <div
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide ? 'bg-white' : 'bg-white/50'
            }`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div></>}
    </div>
  )
}