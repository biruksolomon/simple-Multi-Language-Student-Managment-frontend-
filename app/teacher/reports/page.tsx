"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { FileText, Plus, Eye, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"

const mockReports = [
  {
    id: 1,
    date: "2024-12-12",
    course: "Mathematics 101",
    studentsPresent: 32,
    studentsAbsent: 3,
    activities: "Completed Chapter 5, quizzes conducted",
    issues: "Two students need additional help with concepts",
    submitted: true,
  },
  {
    id: 2,
    date: "2024-12-11",
    course: "Mathematics 101",
    studentsPresent: 30,
    studentsAbsent: 5,
    activities: "Reviewed previous material, group work sessions",
    issues: "Class was interrupted by power outage",
    submitted: true,
  },
  {
    id: 3,
    date: "2024-12-10",
    course: "Mathematics 101",
    studentsPresent: 34,
    studentsAbsent: 1,
    activities: "Completed Chapter 4, started Chapter 5",
    issues: "None",
    submitted: false,
  },
]

export default function TeacherReportsPage() {
  const [showDialog, setShowDialog] = useState(false)
  const [selectedReport, setSelectedReport] = useState<number | null>(null)
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    course: "",
    date: new Date().toISOString().split("T")[0],
    studentsPresent: "",
    studentsAbsent: "",
    activities: "",
    issues: "",
  })

  const handleOpenDialog = (report?: (typeof mockReports)[0]) => {
    if (report) {
      setSelectedReport(report.id)
      setFormData({
        course: report.course,
        date: report.date,
        studentsPresent: report.studentsPresent.toString(),
        studentsAbsent: report.studentsAbsent.toString(),
        activities: report.activities,
        issues: report.issues,
      })
    } else {
      setSelectedReport(null)
      setFormData({
        course: "",
        date: new Date().toISOString().split("T")[0],
        studentsPresent: "",
        studentsAbsent: "",
        activities: "",
        issues: "",
      })
    }
    setShowDialog(true)
  }

  const handleSubmitReport = () => {
    toast({
      title: "Success!",
      description: "Daily report submitted to Central Office",
    })
    setShowDialog(false)
  }

  return (
    <div className="p-8 space-y-8">
      <Link href="/teacher/dashboard">
        <Button variant="ghost">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Button>
      </Link>

      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Daily Reports</h1>
          <p className="text-gray-600 mt-2">Submit daily reports to the Central Main Office</p>
        </div>
        <Button className="bg-green-600 hover:bg-green-700" onClick={() => handleOpenDialog()}>
          <Plus className="w-4 h-4 mr-2" />
          Create Report
        </Button>
      </div>

      <Tabs defaultValue="pending" className="space-y-4">
        <TabsList>
          <TabsTrigger value="pending">Pending Submission</TabsTrigger>
          <TabsTrigger value="submitted">Submitted</TabsTrigger>
          <TabsTrigger value="all">All Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="pending">
          <div className="space-y-4">
            {mockReports
              .filter((r) => !r.submitted)
              .map((report) => (
                <Card key={report.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          <FileText className="w-5 h-5 text-orange-600" />
                          {report.course} - {report.date}
                        </CardTitle>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-3 bg-green-50 rounded">
                        <p className="text-sm text-gray-600">Present</p>
                        <p className="text-lg font-semibold text-green-600">{report.studentsPresent}</p>
                      </div>
                      <div className="p-3 bg-red-50 rounded">
                        <p className="text-sm text-gray-600">Absent</p>
                        <p className="text-lg font-semibold text-red-600">{report.studentsAbsent}</p>
                      </div>
                    </div>
                    <div>
                      <p className="font-medium text-sm text-gray-700">Daily Activities</p>
                      <p className="text-gray-600">{report.activities}</p>
                    </div>
                    <div>
                      <p className="font-medium text-sm text-gray-700">Issues & Concerns</p>
                      <p className="text-gray-600">{report.issues}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button className="bg-green-600 hover:bg-green-700" onClick={() => handleOpenDialog(report)}>
                        Edit & Submit
                      </Button>
                      <Button size="sm" variant="outline">
                        <Eye className="w-4 h-4 mr-2" />
                        Preview
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="submitted">
          <div className="space-y-4">
            {mockReports
              .filter((r) => r.submitted)
              .map((report) => (
                <Card key={report.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          <FileText className="w-5 h-5 text-green-600" />
                          {report.course} - {report.date}
                        </CardTitle>
                        <span className="text-xs text-green-600 mt-1">✓ Submitted</span>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="all">
          <div className="space-y-4">
            {mockReports.map((report) => (
              <Card key={report.id}>
                <CardContent className="pt-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium">
                        {report.course} - {report.date}
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        Present: {report.studentsPresent}, Absent: {report.studentsAbsent}
                      </p>
                    </div>
                    <span
                      className={`text-xs px-2 py-1 rounded ${report.submitted ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}`}
                    >
                      {report.submitted ? "Submitted" : "Pending"}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Create Daily Report</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Course</label>
                <select
                  value={formData.course}
                  onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg"
                >
                  <option value="">Select Course</option>
                  <option value="Mathematics 101">Mathematics 101</option>
                  <option value="English 101">English 101</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Date</label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Students Present</label>
                <input
                  type="number"
                  value={formData.studentsPresent}
                  onChange={(e) => setFormData({ ...formData, studentsPresent: e.target.value })}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg"
                  min="0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Students Absent</label>
                <input
                  type="number"
                  value={formData.studentsAbsent}
                  onChange={(e) => setFormData({ ...formData, studentsAbsent: e.target.value })}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg"
                  min="0"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Daily Activities</label>
              <textarea
                value={formData.activities}
                onChange={(e) => setFormData({ ...formData, activities: e.target.value })}
                className="w-full px-3 py-2 border border-neutral-300 rounded-lg"
                rows={3}
                placeholder="Describe today's class activities..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Issues & Concerns</label>
              <textarea
                value={formData.issues}
                onChange={(e) => setFormData({ ...formData, issues: e.target.value })}
                className="w-full px-3 py-2 border border-neutral-300 rounded-lg"
                rows={3}
                placeholder="Any issues or concerns to report..."
              />
            </div>

            <div className="flex gap-3">
              <Button className="bg-green-600 hover:bg-green-700" onClick={handleSubmitReport}>
                Submit Report to Central Office
              </Button>
              <Button variant="outline" onClick={() => setShowDialog(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
