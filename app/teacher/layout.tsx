"use client"

import type React from "react"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { TeacherSidebar } from "@/components/teacher/sidebar"
import { TeacherHeader } from "@/components/teacher/header"

export default function TeacherLayout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isAuthenticated || user?.role !== "teacher") {
      router.push("/")
    }
  }, [isAuthenticated, user, router])

  if (!isAuthenticated || user?.role !== "teacher") {
    return null
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <TeacherSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TeacherHeader />
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  )
}
