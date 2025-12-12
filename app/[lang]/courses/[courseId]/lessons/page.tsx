"use client"

import type { Language } from "@/lib/i18n"
import { DashboardLayout } from "@/components/dashboard/layout"
import { VideoPlayer } from "@/components/videos/video-player"

const mockLessons = [
  {
    id: 1,
    title: "Introduction to Python",
    description: "Learn the basics of Python programming language",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    durationMinutes: 45,
    orderSequence: 1,
  },
  {
    id: 2,
    title: "Variables and Data Types",
    description: "Understanding variables, data types, and operations",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    durationMinutes: 52,
    orderSequence: 2,
  },
  {
    id: 3,
    title: "Control Flow",
    description: "Conditionals and loops in Python",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    durationMinutes: 58,
    orderSequence: 3,
  },
]

export default function LessonsPage({ params }: { params: { lang: Language; courseId: string } }) {
  const { lang } = params

  return (
    <DashboardLayout lang={lang}>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-neutral-900">Course Lessons</h1>

        <div className="space-y-4">
          {mockLessons.map((lesson) => (
            <VideoPlayer
              key={lesson.id}
              lang={lang}
              title={lesson.title}
              description={lesson.description}
              videoUrl={lesson.videoUrl}
              durationMinutes={lesson.durationMinutes}
              orderSequence={lesson.orderSequence}
            />
          ))}
        </div>
      </div>
    </DashboardLayout>
  )
}
