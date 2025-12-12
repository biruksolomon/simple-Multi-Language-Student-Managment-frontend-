"use client"

import type { Language } from "@/lib/i18n"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Download, Eye } from "lucide-react"

interface CertificateViewerProps {
  lang: Language
  certificateNumber: string
  studentName: string
  courseName: string
  issueDate: string
  finalMarks: number
}

export function CertificateViewer({
  lang,
  certificateNumber,
  studentName,
  courseName,
  issueDate,
  finalMarks,
}: CertificateViewerProps) {
  const isRTL = lang === "ar"

  const handleDownload = async () => {
    try {
      const response = await fetch(`/api/certificates/download?certId=${certificateNumber}`)
      if (!response.ok) throw new Error("Failed to download")

      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `certificate-${certificateNumber}.pdf`
      a.click()
    } catch (error) {
      console.error("Download error:", error)
    }
  }

  return (
    <Card className="border-2 border-yellow-500" dir={isRTL ? "rtl" : "ltr"}>
      <CardHeader className="bg-gradient-to-r from-yellow-50 to-amber-50">
        <CardTitle className="text-center text-yellow-800">Certificate of Completion</CardTitle>
      </CardHeader>
      <CardContent className="pt-8">
        <div className="space-y-6 text-center">
          <div className="border-b-2 border-dashed border-neutral-300 pb-4">
            <p className="text-neutral-500 text-sm mb-2">This is to certify that</p>
            <p className="text-2xl font-bold text-neutral-900">{studentName}</p>
          </div>

          <div>
            <p className="text-neutral-600">has successfully completed the course</p>
            <p className="text-xl font-semibold text-blue-600 mt-2">{courseName}</p>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-neutral-500">Final Marks</p>
              <p className="text-lg font-bold text-green-600">{finalMarks}/100</p>
            </div>
            <div>
              <p className="text-neutral-500">Issue Date</p>
              <p className="text-lg font-semibold text-neutral-900">{issueDate}</p>
            </div>
          </div>

          <div className="pt-4 border-t-2 border-dashed border-neutral-300">
            <p className="text-sm text-neutral-500">Certificate No.</p>
            <p className="font-mono text-neutral-700">{certificateNumber}</p>
          </div>

          <div className="flex gap-2 pt-4">
            <Button variant="outline" className="flex-1 bg-transparent" onClick={handleDownload}>
              <Download className="w-4 h-4 mr-2" />
              Download
            </Button>
            <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
              <Eye className="w-4 h-4 mr-2" />
              View
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
