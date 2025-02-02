import Link from 'next/link'
import Layout from '../../components/layout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { exerciseData } from '../../data/excercise-data'
import { notFound } from 'next/navigation'
import { ChevronLeft, Play } from 'lucide-react'

export default function DayExercisesPage({ params }) {
  const dayKey = `day-${params.day}`
  console.log(dayKey);
  const exercises = exerciseData[dayKey]

  if (!exercises) {
    notFound()
  }

  return (<Layout>
    <div className="container mx-auto p-4">
    <div className="flex items-center mb-6">
        <Link href={`/videos`}>
          <Button variant="outline" size="icon" className="mr-4">
            <ChevronLeft className="h-4 w-4" />
          </Button>
        </Link> 
        <h1 className="text-xl md:text-2xl font-bold text-center">Day {params.day} Exercises</h1>
      </div>
     
      <div className="grid md:grid-cols-2 gap-4">
        {exercises.map((exercise) => (
          <Card key={exercise.id} className="grid grid-cols-2 items-center hover:shadow-lg transition-shadow border-none">
            <CardHeader>
              <CardTitle className="text-md md:text-xl">{exercise.name}</CardTitle>
              {exercise.difficulty &&  <CardDescription >
              <span className="text-sm text-muted-foreground">
                  {exercise.difficulty} | {exercise.duration}
              </span>
              </CardDescription>}
            </CardHeader>
           
            <CardContent className="p-6">
              <div className="flex justify-end items-center">
                
                <Link href={`/exercise/${params.day}/${exercise.id}`}>
                  <Button size="sm" className="bg-emerald-400 hover:bg-sky-800 text-slate-50 text-xs md:text-base">Start</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
    </Layout>
  )
}