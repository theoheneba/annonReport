"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { format } from "date-fns"

export default function CheckStatus() {
  const [loading, setLoading] = useState(false)
  const [report, setReport] = useState<any>(null)

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setLoading(true)

    const formData = new FormData(event.currentTarget)
    const response = await fetch(`/api/status?id=${formData.get("trackingId")}`)
    const data = await response.json()

    if (data.success) {
      setReport(data.report)
    } else {
      toast.error("Failed to find report. Please check your tracking ID.")
    }

    setLoading(false)
  }

  return (
    <main className="container py-10">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Check Report Status</CardTitle>
          <CardDescription>Enter your tracking ID to check the status of your report.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="trackingId">Tracking ID</Label>
              <Input id="trackingId" name="trackingId" placeholder="Enter your tracking ID" required />
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Checking..." : "Check Status"}
            </Button>
          </form>

          {report && (
            <div className="mt-8 space-y-4">
              <div className="rounded-lg bg-muted p-4">
                <div className="font-semibold">Status: {report.status}</div>
                <div className="text-sm text-muted-foreground">
                  Submitted on: {format(new Date(report.date_submitted), "PPP")}
                </div>
                <div className="text-sm text-muted-foreground">
                  Date of Incident: {format(new Date(report.date_of_incident), "PPP")}
                </div>
                <div className="mt-2">
                  <div className="font-medium">Category: {report.category}</div>
                  <div className="font-medium">Location: {report.location}</div>
                  <div className="mt-2">{report.description}</div>
                </div>
              </div>

              {report.updates?.length > 0 && (
                <div className="space-y-4">
                  <h3 className="font-semibold">Updates</h3>
                  {report.updates.map((update: any, index: number) => (
                    <div key={index} className="rounded-lg border p-4">
                      <div className="font-medium">Status: {update.status}</div>
                      <div className="mt-2 text-sm">{update.message}</div>
                      <div className="mt-1 text-xs text-muted-foreground">
                        {format(new Date(update.date_added), "PPP")}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </main>
  )
}

