'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Trophy, Flame, CheckCircle, Calendar,RotateCw, XCircle, Clock, Circle, Hourglass  } from 'lucide-react'
import { useProgress } from '../context/progress-provider'
import { Progress } from '@/components/ui/progress'
import { getDays } from '../data/excercise-data'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import WeeklyCalendarControl from "../components/calender-control"
import { useEffect, useState } from 'react'

// Utility function to get week dates
function getWeekDates(date) {
  const start = new Date(date)
  
  start.setDate(start.getDate() - start.getDay())
  
  return Array.from({ length: 7 }, (_, i) => {
    console.log("startdate : "+start)
    const date = new Date(start)
    date.setDate(start.getDate() + i)
    return date
  })
}
export default function StatisticsCard() {
  const { progress, resetProgress } = useProgress()
  const totalDays = getDays().length
  const completedDays = 3;//Object.keys(progress.dailyCompletions).length
  

  // Calculate overall progress
  const overallProgress = (completedDays / totalDays) * 100

  const [childData,setChildData] = useState("");
  const [profileData,setProfileData] = useState(null);
  const [userId,setUserId] = useState(null);
  useEffect(()=>{if(typeof(Storage)!=undefined){
    setUserId((sessionStorage.getItem("userId") || null))
  }
});
console.log("userId : "+userId)

  //handle child data changes
  const handleChildDataChange = (newData) =>{ 
    console.log("newData");
    console.log(newData.weekStartDate);
    setChildData(newData);
  }

  useEffect(()=>{
    if(typeof(Storage) != undefined){
      if(localStorage.getItem("userProfiles")!=undefined){
        console.log("user profile")
          const profileDataJSON = JSON.parse(localStorage.getItem("userProfiles"));

          //profile check
          setProfileData((profileDataJSON[userId])?profileDataJSON[userId].creationDate.split("T")[0]:"Not Available");
          
      }
    }
  },[profileData])
  // Detailed day completion tracker
  const renderDayCompletionStatus = () => {
    return getDays().map((day, index) => {
      const dayNumber = index + 1
      progress.dailyCompletions[1]="12"
      progress.dailyCompletions[2]=""
      progress.dailyCompletions[3]=""
      progress.dailyCompletions[4]=""
      progress.dailyCompletions[5]=""
      progress.dailyCompletions[6]=""
      progress.dailyCompletions[7]=""
    const isCompleted = (progress.dailyCompletions[dayNumber]?.length > 4)?"C":(progress.dailyCompletions[dayNumber]?.length==0)?"N":"I"
    console.log("isCompleted : "+isCompleted)
    console.log("isCompleted : "+progress.dailyCompletions[dayNumber])
      
      return (
        <div 
          key={day} 
          className={`w-8 md:w-14 h-8 rounded-full flex items-center justify-center ${
            isCompleted == "C"
              ? 'bg-emerald-400 text-white' 
              :  isCompleted == "I" ?'bg-red-500 text-white':'bg-secondary text-secondary-foreground'
          }`}
          title={isCompleted == "I"? `Day ${dayNumber} Completed` : `Day ${dayNumber} Not Completed`}
        >
           {dayNumber}
        </div>
      )
    })
  }

  // Detailed progress breakdown
  const renderDetailedBreakdown = () => {
    return childData && childData.weekStartDate.map((date, index)  => {
      const dayNumber = index + 1
      const completedExercises = progress.dailyCompletions[dayNumber]
      // Remove the time part for comparison (set to midnight)
  const currentDateOnly = new Date(new Date().setHours(0, 0, 0, 0));
  
  // Remove the time part from the input date for comparison
  const inputDateOnly = new Date(date.setHours(0, 0, 0, 0));

  // Compare both dates
      const cDate = currentDateOnly.getTime() < inputDateOnly.getTime()?true:false;
      console.log("progress.dailyCompletions[dayNumber]")
      console.log(cDate)
      console.log(completedExercises.length)
      return (
        <div 
          key={index} 
          className={`border-b last:border-b-0 py-2 flex justify-between items-center p-2 ${cDate?"text-gray-400":""}`}
        >
              <div>
                <div><span className="font-medium">Day {dayNumber}</span></div>
                <div className="text-xs font-semibold">
                  {date.toLocaleDateString('en-US', { weekday: 'short' })}
                </div>
                <div className="text-sm">
              {  date.toLocaleDateString("en-GB", { 
                  day: "2-digit", 
                  month: "2-digit", 
                  year: "numeric" 
                }) }
                </div>
                </div> 
          
          <div className="flex items-center space-x-2">
           {!cDate ? <><span className="text-muted-foreground">
              {completedExercises.length} / 5 Exercises
            </span>
            {completedExercises.length == 0 ? (
               <XCircle color="red" className="text-muted-foreground w-5 h-5" />
            ) : completedExercises.length < 5 ?(<Clock color="orange" className="text-green-500 w-5 h-5" />) :( 
              <CheckCircle className="text-green-500 w-5 h-5" />
            )}</>
            :<><span className='text-gray-400'>Yet to start</span> <Hourglass color="gray" className="text-green-500 w-5 h-5"/></>}
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
        {/*  <DialogTrigger asChild>
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
          </DialogContent>*/}
        </Dialog>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Overall Progress */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium">Overall Progress</span>
            <span className="text-sm text-muted-foreground">
            <small>[Current Week Status]</small> {completedDays}/{totalDays} Days
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
            <div className="text-xs text-muted-foreground">Day Streak</div>  
          </div>

          {/* Longest Streak */}
          <div className="bg-secondary/10 rounded-lg p-4 text-center">
            <Trophy className="mx-auto mb-2 text-yellow-500" />
            <div className="font-bold">{progress.longestStreak || 5}</div>
            <div className="text-xs text-muted-foreground">Weekly Streak</div>
          </div>

          {/* Completed Exercises */}
          <div className="bg-secondary/10 rounded-lg p-4 text-center">
            <CheckCircle className="mx-auto mb-2 text-green-500" />
            <div className="font-bold">{progress.completedExercises.length || 5}</div>
            <div className="text-xs text-muted-foreground">Completed Videos</div>
          </div>
        </div>

        {/* Day Completion Status */}
        <div>
          <h3 className="text-sm font-medium mb-2">Day Completion</h3>
          <div className="flex mb-4">
          <WeeklyCalendarControl onDataChange={handleChildDataChange}/>
          </div>
          <div className="flex gap-2">
            
            {renderDayCompletionStatus()}
          </div>
        </div>

        {/* Detailed Progress Breakdown */}
        <div>
          <div className='flex justify-between'>
            <h3 className="text-sm font-medium mb-2">Detailed Progress</h3>
            <h3 className="text-sm font-medium mb-2">Joined On: <small className='font-bold text-green-600'>{profileData}</small></h3>
          </div>
          <div className="text-sm md:text-base font-bold border rounded-lg">
            {renderDetailedBreakdown()}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}