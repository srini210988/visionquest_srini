'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Trophy, Flame, CheckCircle, Calendar,RotateCw } from 'lucide-react'
import { useProgress } from '../context/progress-provider'
import { Progress } from '@/components/ui/progress'
import { getDays } from '../data/excercise-data'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'

export default function StatisticsCard() {
  const { progress, resetProgress } = useProgress()
  const totalDays = getDays().length
  const completedDays = 3;//Object.keys(progress.dailyCompletions).length

  // Calculate overall progress
  const overallProgress = (completedDays / totalDays) * 100

  // Detailed day completion tracker
  const renderDayCompletionStatus = () => {
    return getDays().map((day, index) => {
      const dayNumber = index + 1
      progress.dailyCompletions[1]="1234"
      progress.dailyCompletions[4]="1234"
    const isCompleted = progress.dailyCompletions[dayNumber]?.length > 0
    
      
      return (
        <div 
          key={day} 
          className={`w-8 md:w-14 h-8 rounded-full flex items-center justify-center ${
            isCompleted 
              ? 'bg-emerald-400 text-white' 
              : 'bg-secondary text-secondary-foreground'
          }`}
          title={isCompleted ? `Day ${dayNumber} Completed` : `Day ${dayNumber} Not Completed`}
        >
          {dayNumber}
        </div>
      )
    })
  }

  // Detailed progress breakdown
  const renderDetailedBreakdown = () => {
    return getDays().map((day, index) => {
      const dayNumber = index + 1
      const completedExercises = progress.dailyCompletions[dayNumber] || [100]
      
      return (
        <div 
          key={day} 
          className="border-b last:border-b-0 py-2 flex justify-between items-center p-2"
        >
          <span className="font-medium">Day {dayNumber}</span>
          <div className="flex items-center space-x-2">
            <span className="text-muted-foreground">
              {completedExercises.length} / 4 Exercises
            </span>
            {completedExercises.length > 0 ? (
              <CheckCircle className="text-green-500 w-5 h-5" />
            ) : (
              <Calendar className="text-muted-foreground w-5 h-5" />
            )}
          </div>
        </div>
      )
    })
  }

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <CardTitle className="text-md md:text-2xl">Your Eye Exercise Journey</CardTitle>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm" className="bg-emerald-400 hover:bg-sky-800 text-slate-50 hover:text-slate-50 font-bold ">
              Reset <RotateCw />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Reset Progress</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <p>Are you sure you want to reset all your progress?</p>
              <div className="flex justify-end space-x-2">
                <Button variant="outline">Cancel</Button>
                <Button 
                  variant="destructive" 
                  onClick={resetProgress}
                >
                  Reset Progress
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Overall Progress */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium">Overall Progress</span>
            <span className="text-sm text-muted-foreground">
              {completedDays}/{totalDays} Days
            </span>
          </div>
          <Progress value={overallProgress} className="bg-cyan-800"/>
        </div>

        {/* Statistics Tiles */}
        <div className="grid grid-cols-3 gap-4">
          {/* Current Streak */}
          <div className="bg-secondary/10 rounded-lg p-4 text-center">
            <Flame className="mx-auto mb-2 text-orange-500" />
            <div className="font-bold">{progress.currentStreak || 3}</div>
            <div className="text-xs text-muted-foreground">Current</div>
          </div>

          {/* Longest Streak */}
          <div className="bg-secondary/10 rounded-lg p-4 text-center">
            <Trophy className="mx-auto mb-2 text-yellow-500" />
            <div className="font-bold">{progress.longestStreak || 5}</div>
            <div className="text-xs text-muted-foreground">Achieved</div>
          </div>

          {/* Completed Exercises */}
          <div className="bg-secondary/10 rounded-lg p-4 text-center">
            <CheckCircle className="mx-auto mb-2 text-green-500" />
            <div className="font-bold">{progress.completedExercises.length || 5}</div>
            <div className="text-xs text-muted-foreground">Completed</div>
          </div>
        </div>

        {/* Day Completion Status */}
        <div>
          <h3 className="text-sm font-medium mb-2">Day Completion</h3>
          <div className="flex gap-2">
            {renderDayCompletionStatus()}
          </div>
        </div>

        {/* Detailed Progress Breakdown */}
        <div>
          <h3 className="text-sm font-medium mb-2">Detailed Progress</h3>
          <div className="text-sm md:text-base font-bold border rounded-lg">
            {renderDetailedBreakdown()}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}