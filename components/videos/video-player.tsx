"use client"

import { useState } from "react"
import type { Language } from "@/lib/i18n"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Play, Clock, BookOpen } from "lucide-react"

interface VideoPlayerProps {
  lang: Language
  title: string
  description: string
  videoUrl: string
  durationMinutes: number
  orderSequence: number
}

export function VideoPlayer({ lang, title, description, videoUrl, durationMinutes, orderSequence }: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const isRTL = lang === "ar"

  return (
    <Card dir={isRTL ? "rtl" : "ltr"}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <div className="flex-1">
          <CardTitle className="flex items-center gap-2">
            <Badge variant="outline">Lesson {orderSequence}</Badge>
            {title}
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="relative bg-neutral-900 rounded-lg overflow-hidden aspect-video flex items-center justify-center group">
          {isPlaying ? (
            <iframe
              width="100%"
              height="100%"
              src={`${videoUrl}?autoplay=1`}
              title={title}
              allowFullScreen
              className="rounded-lg"
            />
          ) : (
            <>
              <img
                src={`/placeholder.svg?height=400&width=600&query=video+thumbnail+lesson`}
                alt="Video thumbnail"
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setIsPlaying(true)}
                className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/60 transition-colors"
              >
                <div className="bg-blue-600 p-4 rounded-full">
                  <Play className="w-8 h-8 text-white fill-white" />
                </div>
              </button>
            </>
          )}
        </div>

        <div className="space-y-2">
          <p className="text-neutral-700">{description}</p>

          <div className="flex gap-4 text-sm text-neutral-600">
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{durationMinutes} minutes</span>
            </div>
            <div className="flex items-center gap-1">
              <BookOpen className="w-4 h-4" />
              <span>Lesson {orderSequence}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
