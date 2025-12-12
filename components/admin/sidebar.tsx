"use client"

import { useAuth } from "@/lib/auth-context"
import { useI18n } from "@/components/use-i18n"
import { Button } from "@/components/ui/button"
import { LayoutDashboard, Users, Award, BarChart3, Settings, LogOut, Menu, X, BookOpen } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export function AdminSidebar() {
  const { logout } = useAuth()
  const { t } = useI18n()
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { href: "/admin/dashboard", label: t("nav.dashboard"), icon: LayoutDashboard },
    { href: "/admin/students", label: t("nav.students"), icon: Users },
    { href: "/admin/teachers", label: t("nav.teachers"), icon: Users },
    { href: "/admin/courses", label: t("nav.courses"), icon: BookOpen },
    { href: "/admin/certificates", label: t("nav.certificates"), icon: Award },
    { href: "/admin/reports", label: t("nav.reports"), icon: BarChart3 },
    { href: "/admin/settings", label: t("nav.settings"), icon: Settings },
  ]

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-md"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Sidebar */}
      <aside
        className={`${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 fixed md:static inset-y-0 left-0 w-64 bg-white border-r border-gray-200 z-40 transition-transform duration-300`}
      >
        <div className="p-6">
          <h1 className="text-2xl font-bold text-purple-600 mb-8">AMS Admin</h1>

          {/* Navigation */}
          <nav className="space-y-2 mb-8">
            {navItems.map((item) => {
              const Icon = item.icon
              return (
                <Link key={item.href} href={item.href}>
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-gray-700 hover:text-purple-600 hover:bg-purple-50"
                    onClick={() => setIsOpen(false)}
                  >
                    <Icon className="w-5 h-5 mr-3" />
                    {item.label}
                  </Button>
                </Link>
              )
            })}
          </nav>

          {/* Logout */}
          <Button
            variant="outline"
            className="w-full justify-start text-red-600 hover:text-red-700 border-red-200 bg-transparent"
            onClick={logout}
          >
            <LogOut className="w-5 h-5 mr-3" />
            {t("nav.logout")}
          </Button>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {isOpen && <div className="fixed inset-0 bg-black/50 md:hidden z-30" onClick={() => setIsOpen(false)} />}
    </>
  )
}
