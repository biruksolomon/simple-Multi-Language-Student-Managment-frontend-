import { redirect } from "next/navigation"
import type { Language } from "@/lib/i18n"
import { LoginForm } from "@/components/auth/login-form"

export default function Home({ params }: { params: { lang: Language } }) {
  const { lang } = params

  if (!["en", "ar", "am", "om"].includes(lang)) {
    redirect("/en")
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-cyan-50">
      <div className="w-full max-w-md">
        <LoginForm lang={lang} />
      </div>
    </main>
  )
}
