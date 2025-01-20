"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"

const categories = [
  "Workplace Harassment",
  "Financial Fraud",
  "Corruption",
  "Safety Violations",
  "Environmental Concerns",
  "Other",
]

export default function SubmitReport() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setLoading(true)

    const formData = new FormData(event.currentTarget)
    const response = await fetch("/api/submit", {
      method: "POST",
      body: JSON.stringify({
        category: formData.get("category"),
        description: formData.get("description"),
        location: formData.get("location"),
      }),
    })

    const data = await response.json()

    if (data.success) {
      toast.success(`Report submitted successfully! Your tracking ID is: ${data.trackingId}`)
      router.push(`/status?id=${data.trackingId}`)
    } else {
      toast.error("Failed to submit report. Please try again.")
    }

    setLoading(false)
  }

  return (
    <main className="container py-10">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Submit a Report</CardTitle>
          <CardDescription>
            Your report will be handled confidentially and your identity will remain anonymous.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select name="category" required>
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input id="location" name="location" placeholder="Where did this occur?" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Please provide detailed information about your concern..."
                className="min-h-[200px]"
                required
              />
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Submitting..." : "Submit Report"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </main>
  )
}

