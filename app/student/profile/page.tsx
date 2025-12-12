"use client"

import { useAuth } from "@/lib/auth-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { User, Lock, Bell } from "lucide-react"

export default function StudentProfilePage() {
  const { user } = useAuth()
  const student = user as any

  return (
    <div className="p-8 space-y-8 max-w-2xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
        <p className="text-gray-600 mt-2">Manage your account settings and preferences</p>
      </div>

      <Tabs defaultValue="account" className="space-y-4">
        <TabsList>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>

        {/* Account Tab */}
        <TabsContent value="account" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                Personal Information
              </CardTitle>
              <CardDescription>Update your basic information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="fullname">Full Name</Label>
                <Input id="fullname" defaultValue={student?.name} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" defaultValue={student?.email} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" placeholder="+251912345678" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Input id="bio" placeholder="Tell us about yourself" />
              </div>

              <Button className="bg-blue-600 hover:bg-blue-700">Save Changes</Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="w-5 h-5" />
                Change Password
              </CardTitle>
              <CardDescription>Update your password regularly for security</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="current">Current Password</Label>
                <Input id="current" type="password" placeholder="••••••••" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="new">New Password</Label>
                <Input id="new" type="password" placeholder="••••••••" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirm">Confirm Password</Label>
                <Input id="confirm" type="password" placeholder="••••••••" />
              </div>

              <Button className="bg-blue-600 hover:bg-blue-700">Update Password</Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5" />
                Notification Preferences
              </CardTitle>
              <CardDescription>Manage how you receive notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">Email Notifications</p>
                  <p className="text-sm text-gray-500">Receive updates about your courses</p>
                </div>
                <input type="checkbox" defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">Grade Updates</p>
                  <p className="text-sm text-gray-500">Get notified when grades are posted</p>
                </div>
                <input type="checkbox" defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">Assignment Reminders</p>
                  <p className="text-sm text-gray-500">Remind me about upcoming assignments</p>
                </div>
                <input type="checkbox" defaultChecked />
              </div>

              <Button className="bg-blue-600 hover:bg-blue-700">Save Preferences</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
