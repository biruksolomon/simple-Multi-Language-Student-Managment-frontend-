"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

export type UserRole = "student" | "teacher" | "admin" | null
export type StudentStatus = "pending" | "approved" | "rejected" | "payment_pending" | "active"

export interface User {
  id: string
  email: string
  name: string
  role: UserRole
  avatar?: string
}

export interface Student extends User {
  role: "student"
  status: StudentStatus
  enrolledCourses: string[]
  attendance: Record<string, number>
  grades: Record<string, number>
}

export interface Teacher extends User {
  role: "teacher"
  courses: string[]
  department: string
}

export interface Admin extends User {
  role: "admin"
}

export type CurrentUser = Student | Teacher | Admin | null

interface AuthContextType {
  user: CurrentUser
  login: (email: string, password: string, role: UserRole) => void
  logout: () => void
  updateUserStatus: (status: StudentStatus) => void
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<CurrentUser>(null)

  const login = (email: string, password: string, role: UserRole) => {
    // Mock authentication
    const mockUsers: Record<string, CurrentUser> = {
      "student@example.com": {
        id: "1",
        email: "student@example.com",
        name: "Ahmed Hassan",
        role: "student",
        status: "pending",
        enrolledCourses: [],
        attendance: {},
        grades: {},
      },
      "teacher@example.com": {
        id: "2",
        email: "teacher@example.com",
        name: "Dr. Fatima Mohamed",
        role: "teacher",
        courses: ["MATH101", "MATH102"],
        department: "Mathematics",
      },
      "admin@example.com": {
        id: "3",
        email: "admin@example.com",
        name: "Admin User",
        role: "admin",
      },
    }

    const authenticatedUser = mockUsers[email]
    if (authenticatedUser && authenticatedUser.role === role) {
      setUser(authenticatedUser)
    }
  }

  const logout = () => {
    setUser(null)
  }

  const updateUserStatus = (status: StudentStatus) => {
    if (user?.role === "student") {
      setUser({ ...user, status })
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        updateUserStatus,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within AuthProvider")
  }
  return context
}
