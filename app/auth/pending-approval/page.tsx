import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Link from "next/link"
import { Clock } from "lucide-react"

export default function PendingApprovalPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Pending Admin Approval</CardTitle>
          <CardDescription>Your account is awaiting administrator approval</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex justify-center">
            <div className="relative w-24 h-24">
              <div className="absolute inset-0 rounded-full border-4 border-blue-100 animate-spin border-t-blue-600"></div>
              <Clock className="absolute inset-0 m-auto text-blue-600 w-12 h-12" />
            </div>
          </div>

          <Alert className="bg-blue-50 border-blue-200">
            <AlertDescription className="text-blue-700">
              Your registration has been received. The administrator will review your information and approve your
              account shortly. You will receive an email notification once approved.
            </AlertDescription>
          </Alert>

          <div className="space-y-3 bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-900">What happens next?</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-start">
                <span className="text-blue-600 font-bold mr-3">1</span>
                <span>Admin reviews your registration</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 font-bold mr-3">2</span>
                <span>You receive approval email</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 font-bold mr-3">3</span>
                <span>Complete payment for enrollment</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 font-bold mr-3">4</span>
                <span>Access your student dashboard</span>
              </li>
            </ul>
          </div>

          <Link href="/">
            <Button className="w-full bg-transparent" variant="outline">
              Back to Home
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}
