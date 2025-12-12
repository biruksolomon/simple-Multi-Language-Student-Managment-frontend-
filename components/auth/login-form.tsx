"use client"

import type React from "react"

import { useState } from "react"
import type { Language } from "@/lib/i18n"
import { t } from "@/lib/i18n"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"

interface LoginFormProps {
  lang: Language
}

export function LoginForm({ lang }: LoginFormProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // TODO: Connect to backend API
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })

      if (!response.ok) throw new Error("Login failed")

      const data = await response.json()
      localStorage.setItem("token", data.token)

      toast({
        title: t("common.success", lang),
        description: "Login successful",
      })

      // Redirect to dashboard
      window.location.href = `/${lang}/dashboard`
    } catch (error) {
      toast({
        title: t("common.error", lang),
        description: error instanceof Error ? error.message : "Login failed",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const isRTL = lang === "ar"

  return (
    <Card className={isRTL ? "rtl" : "ltr"}>
      <CardHeader>
        <CardTitle>{t("auth.login", lang)}</CardTitle>
        <CardDescription>Enter your credentials to access your account</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="email">{t("auth.email", lang)}</Label>
            <Input
              id="email"
              type="email"
              placeholder={t("auth.email", lang)}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              dir={isRTL ? "rtl" : "ltr"}
            />
          </div>
          <div>
            <Label htmlFor="password">{t("auth.password", lang)}</Label>
            <Input
              id="password"
              type="password"
              placeholder={t("auth.password", lang)}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              dir={isRTL ? "rtl" : "ltr"}
            />
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? t("common.loading", lang) : t("auth.login", lang)}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
