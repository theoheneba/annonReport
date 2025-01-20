"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"

export default function NewReport() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    category: "",
    title: "",
    description: "",
    location: "",
    dateOfIncident: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, category: value }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch("/api/admin/reports", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error("Failed to create report")
      }

      toast.success("Report created successfully")
      router.push("/admin/reports")
    } catch (error) {
      console.error("Error creating report:", error)
      toast.error("Failed to create report")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-5">Create New Report</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="category">Category</Label>
          <Select onValueChange={handleSelectChange} value={formData.category}>
            <SelectTrigger>
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="corruption">Corruption</SelectItem>
              <SelectItem value="fraud">Fraud</SelectItem>
              <SelectItem value="misconduct">Misconduct</SelectItem>
              <SelectItem value="harassment">Harassment</SelectItem>
              <SelectItem value="discrimination">Discrimination</SelectItem>
              <SelectItem value="environmental">Environmental</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="title">Title</Label>
          <Input id="title" name="title" value={formData.title} onChange={handleChange} required />
        </div>
        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea id="description" name="description" value={formData.description} onChange={handleChange} required />
        </div>
        <div>
          <Label htmlFor="location">Location</Label>
          <Input id="location" name="location" value={formData.location} onChange={handleChange} required />
        </div>
        <div>
          <Label htmlFor="dateOfIncident">Date of Incident</Label>
          <Input
            id="dateOfIncident"
            name="dateOfIncident"
            type="date"
            value={formData.dateOfIncident}
            onChange={handleChange}
            required
          />
        </div>
        <Button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create Report"}
        </Button>
      </form>
    </div>
  )
}

