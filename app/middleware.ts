import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl

    // List of supported languages
    const languages = ["en", "ar", "am", "om"]

    // Check if pathname starts with a language code
    const pathnameHasLanguage = languages.some((lang) => pathname.startsWith(`/${lang}/`) || pathname === `/${lang}`)

    // The app uses context-based i18n, not URL-based routing
    if (pathnameHasLanguage) {
        // Remove language prefix and redirect to the actual route
        const segments = pathname.split("/").filter(Boolean)
        if (languages.includes(segments[0])) {
            segments.shift() // Remove language code
            const newPath = segments.length > 0 ? `/${segments.join("/")}` : "/"
            return NextResponse.redirect(new URL(newPath, request.url))
        }
    }

    return NextResponse.next()
}

export const config = {
    matcher: [
        // Match all pathnames except for
        // - … if they start with `/api`, `/_next` or `/_vercel`
        // - … the ones containing a dot (e.g. `favicon.ico`)
        "/((?!api|_next|_vercel|.*\\..*).*)",
    ],
}
