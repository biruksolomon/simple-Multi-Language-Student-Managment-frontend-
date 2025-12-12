"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Play, Plus, Edit2, Trash2, ArrowLeft } from "lucide-react"
import Link from "next/link"

const mockVideos = [
  {
    id: 1,
    title: "Introduction to Mathematics",
    description: "Basic concepts of mathematics",
    duration: "15:30",
    uploadDate: "2024-12-01",
    views: 142,
  },
  {
    id: 2,
    title: "Algebra Fundamentals",
    description: "Understanding variables and equations",
    duration: "22:45",
    uploadDate: "2024-12-05",
    views: 98,
  },
  {
    id: 3,
    title: "Solving Linear Equations",
    description: "Step-by-step guide to solving equations",
    duration: "18:20",
    uploadDate: "2024-12-08",
    views: 56,
  },
]

export default function TeacherVideosPage() {
  const [showDialog, setShowDialog] = useState(false)
  const [selectedVideo, setSelectedVideo] = useState<number | null>(null)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    videoUrl: "",
  })

  const handleOpenDialog = (video?: (typeof mockVideos)[0]) => {
    if (video) {
      setSelectedVideo(video.id)
      setFormData({
        title: video.title,
        description: video.description,
        videoUrl: "",
      })
    } else {
      setSelectedVideo(null)
      setFormData({ title: "", description: "", videoUrl: "" })
    }
    setShowDialog(true)
  }

  return (
    <div className="p-8 space-y-8">
      <Link href="/teacher/courses">
        <Button variant="ghost">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Courses
        </Button>
      </Link>

      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Video Lessons</h1>
          <p className="text-gray-600 mt-2">Manage video lessons for your course</p>
        </div>
        <Button className="bg-green-600 hover:bg-green-700" onClick={() => handleOpenDialog()}>
          <Plus className="w-4 h-4 mr-2" />
          Upload Video
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {mockVideos.map((video) => (
          <Card key={video.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <CardTitle className="flex items-center gap-2">
                    <Play className="w-5 h-5 text-blue-600" />
                    {video.title}
                  </CardTitle>
                  <p className="text-sm text-gray-600 mt-2">{video.description}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <div className="flex gap-6 text-sm text-gray-500">
                  <span>Duration: {video.duration}</span>
                  <span>Views: {video.views}</span>
                  <span>Uploaded: {video.uploadDate}</span>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    <Play className="w-4 h-4 mr-2" />
                    Preview
                  </Button>
                  <Button size="sm" variant="ghost" onClick={() => handleOpenDialog(video)}>
                    <Edit2 className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="ghost">
                    <Trash2 className="w-4 h-4 text-red-600" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{selectedVideo ? "Edit Video" : "Upload New Video"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Video Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-3 py-2 border border-neutral-300 rounded-lg"
                placeholder="e.g., Introduction to Algebra"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-3 py-2 border border-neutral-300 rounded-lg"
                placeholder="Video description..."
                rows={3}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Video File</label>
              <input type="file" accept="video/*" className="w-full px-3 py-2 border border-neutral-300 rounded-lg" />
            </div>
            <div className="flex gap-3">
              <Button className="bg-green-600 hover:bg-green-700">
                {selectedVideo ? "Update Video" : "Upload Video"}
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
