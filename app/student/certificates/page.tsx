"use client"

import { useI18n } from "@/components/use-i18n"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Download, Award } from "lucide-react"

const mockCertificates = [
  {
    id: 1,
    courseName: "Mathematics 101",
    issueDate: "2024-12-01",
    grade: "A",
  },
  {
    id: 2,
    courseName: "Physics 102",
    issueDate: "2024-11-15",
    grade: "A-",
  },
]

export default function StudentCertificatesPage() {
  const { t } = useI18n()

  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">{t("nav.certificates")}</h1>
        <p className="text-gray-600 mt-2">{t("certificate.issued")}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mockCertificates.map((cert) => (
          <Card key={cert.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <Award className="w-8 h-8 text-blue-600" />
                  <div>
                    <CardTitle>{cert.courseName}</CardTitle>
                    <p className="text-sm text-gray-600 mt-1">
                      {t("certificate.date")}: {cert.issueDate}
                    </p>
                  </div>
                </div>
                <Badge variant="default">{cert.grade}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <Button className="w-full bg-transparent" variant="outline">
                <Download className="w-4 h-4 mr-2" />
                {t("certificate.download")}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
