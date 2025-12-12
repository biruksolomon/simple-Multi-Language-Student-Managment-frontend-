"use client"

import type React from "react"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { Sidebar } from "@/components/student/sidebar"
import { StudentHeader } from "@/components/student/header"

export default function StudentLayout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isAuthenticated || user?.role !== "student") {
      router.push("/")
    }
  }, [isAuthenticated, user, router])

  if (!isAuthenticated || user?.role !== "student") {
    return null
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <StudentHeader />
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  )
}
