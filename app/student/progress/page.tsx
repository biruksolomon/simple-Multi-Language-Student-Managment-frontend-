"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts"

const courseProgress = [
  { course: "Math 101", completed: 75, total: 100 },
  { course: "English", completed: 60, total: 100 },
  { course: "Physics", completed: 45, total: 100 },
]

const gradeHistory = [
  { date: "Week 1", grade: 78 },
  { date: "Week 2", grade: 82 },
  { date: "Week 3", grade: 80 },
  { date: "Week 4", grade: 85 },
  { date: "Week 5", grade: 88 },
]

export default function ProgressPage() {
  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">My Progress</h1>
        <p className="text-gray-600 mt-2">Track your academic progress and performance</p>
      </div>

      <Tabs defaultValue="courses" className="space-y-4">
        <TabsList>
          <TabsTrigger value="courses">Course Progress</TabsTrigger>
          <TabsTrigger value="grades">Grade Trend</TabsTrigger>
        </TabsList>

        <TabsContent value="courses" className="space-y-4">
          {courseProgress.map((item, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="text-lg">{item.course}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Completion</span>
                    <span className="font-semibold">{item.completed}%</span>
                  </div>
                  <Progress value={item.completed} className="h-3" />
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="grades" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Grade Trend Over Time</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={gradeHistory}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip />
                  <Line type="monotone" dataKey="grade" stroke="#3b82f6" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
