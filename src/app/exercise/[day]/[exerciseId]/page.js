import Image from 'next/image'
import Layout from '../../../components/layout'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { exerciseData } from '../../../data/excercise-data'
import { ChevronLeft, Play } from 'lucide-react'


export default async function ExerciseDetailPage({ 
  params 
}) {
  const dayKey = `day-${ params.day}`;
  const exercise = exerciseData[dayKey]?.find(ex => ex.id === params.exerciseId)

  if (!exercise) {
    return (
      <div className="container mx-auto p-4 text-center">
        <h1 className="text-2xl font-bold">Exercise Not Found</h1>
        <Link href={`/day/${params.day}`}>
          <Button className="mt-4">Back to Day Exercises</Button>
        </Link>
      </div>
    )
  }

  return (
    <Layout>
    <div className="container mx-auto p-4">
      <div className="flex items-center mb-6">
        <Link href={`/day/${params.day}`}>
          <Button variant="outline" size="icon" className="mr-4">
            <ChevronLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-xl md:text-2xl font-bold">{exercise.name}</h1>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Video/Image Section */}
        <Card className="h-fit">
           <CardContent className="relative">
            <div className="bg-muted rounded-lg overflow-hidden h-56">
              <Image 
                src={exercise.videoUrl} 
                alt={`${exercise.name} demonstration`}
                width={600}
                height={600}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                <Button 
                  size="lg" 
                  className="rounded-full"
                  // You could add a modal or video player functionality here
                >
                  <Play className="mr-2 h-5 w-5" /> Play Video
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Exercise Details Section */}
        <div className="space-y-6">
         

          {/* Steps Card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl md:text-2xl">Exercise Steps</CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="list-decimal list-inside space-y-2">
                {exercise.steps.map((step, index) => (
                  <li key={index} className="text-muted-foreground">
                    {step}
                  </li>
                ))}
              </ol>
            </CardContent>
          </Card>
 
        </div>
      </div>
    </div>
    </Layout>
  )
}

 