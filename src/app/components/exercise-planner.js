import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {getDays} from '../data/excercise-data'

export default function ExercisePlannner() {
  const days = getDays()
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-xl md:text-2xl font-bold text-center mb-6">Exercise Plan</h1>
      <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-4">
        {days.map((day, index) => (
          <Card key={day} className="grid grid-cols-2 items-center gap-4 hover:shadow-lg transition-shadow border-none">
            <CardHeader>
              <CardTitle className="text-md md:text-xl">{day}</CardTitle>
              <CardDescription>30/01/2025</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <Link href={`/day/${index + 1}`}>
                <Button variant="outline" className="w-full border-none bg-emerald-400 text-slate-50 hover:bg-sky-800 hover:text-slate-50 text-xs md:text-base px-14 font-bold">
                  View Exercises
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}