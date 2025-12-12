"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Search, Download, Plus, Edit2, Trash2 } from "lucide-react"

const mockCourses = [
  {
    id: "MATH101",
    name: "Mathematics 101",
    instructor: "Dr. Ahmed Ali",
    students: 45,
    capacity: 50,
    code: "MATH101",
    status: "active",
  },
  {
    id: "ENG101",
    name: "English 101",
    instructor: "Ms. Fatima Hassan",
    students: 38,
    capacity: 40,
    code: "ENG101",
    status: "active",
  },
  {
    id: "PHY101",
    name: "Physics 101",
    instructor: "Prof. Mohamed Ibrahim",
    students: 32,
    capacity: 35,
    code: "PHY101",
    status: "pending",
  },
]

const availableTeachers = [
  { id: 1, name: "Dr. Ahmed Ali" },
  { id: 2, name: "Ms. Fatima Hassan" },
  { id: 3, name: "Prof. Mohamed Ibrahim" },
  { id: 4, name: "Dr. Sarah Johnson" },
]

export default function AdminCoursesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [showDialog, setShowDialog] = useState(false)
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    code: "",
    capacity: "",
    instructor: "",
    description: "",
  })

  const filteredCourses = mockCourses.filter(
    (c) =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.code.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleOpenDialog = (course?: (typeof mockCourses)[0]) => {
    if (course) {
      setSelectedCourse(course.id)
      setFormData({
        name: course.name,
        code: course.code,
        capacity: course.capacity.toString(),
        instructor: course.instructor,
        description: "",
      })
    } else {
      setSelectedCourse(null)
      setFormData({ name: "", code: "", capacity: "", instructor: "", description: "" })
    }
    setShowDialog(true)
  }

  return (
    <div className="p-8 space-y-8">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Course Management</h1>
          <p className="text-gray-600 mt-2">Create courses, assign teachers, and manage enrollment</p>
        </div>
        <div className="flex gap-3">
          <Button className="bg-green-600 hover:bg-green-700" onClick={() => handleOpenDialog()}>
            <Plus className="w-4 h-4 mr-2" />
            Create Course
          </Button>
          <Button className="bg-purple-600 hover:bg-purple-700">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search courses by name or code..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {filteredCourses.map((course) => (
              <div
                key={course.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{course.name}</p>
                  <p className="text-sm text-gray-500">Code: {course.code}</p>
                  <p className="text-sm text-gray-500">Instructor: {course.instructor}</p>
                </div>
                <div className="text-right mr-4">
                  <p className="text-xs text-gray-600">Enrollment</p>
                  <p className="font-semibold text-gray-900">
                    {course.students}/{course.capacity}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    View Details
                  </Button>
                  <Button size="sm" variant="ghost" onClick={() => handleOpenDialog(course)}>
                    <Edit2 className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="ghost">
                    <Trash2 className="w-4 h-4 text-red-600" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{selectedCourse ? "Edit Course" : "Create New Course"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Course Name</label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g., Advanced Mathematics"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Course Code</label>
                <Input
                  value={formData.code}
                  onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                  placeholder="e.g., MATH101"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Student Capacity</label>
                <Input
                  type="number"
                  value={formData.capacity}
                  onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
                  min="1"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Assign Teacher</label>
              <select
                value={formData.instructor}
                onChange={(e) => setFormData({ ...formData, instructor: e.target.value })}
                className="w-full px-3 py-2 border border-neutral-300 rounded-lg"
              >
                <option value="">Select Teacher</option>
                {availableTeachers.map((teacher) => (
                  <option key={teacher.id} value={teacher.name}>
                    {teacher.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-3 py-2 border border-neutral-300 rounded-lg"
                rows={3}
                placeholder="Course description..."
              />
            </div>
            <div className="flex gap-3">
              <Button className="bg-green-600 hover:bg-green-700">
                {selectedCourse ? "Update Course" : "Create Course"}
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
