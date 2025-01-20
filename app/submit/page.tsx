"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { CategoryStep } from "@/components/report-form/category-step"
import { DetailsStep } from "@/components/report-form/details-step"
import { EvidenceStep } from "@/components/report-form/evidence-step"
import { ReviewStep } from "@/components/report-form/review-step"
import { formSteps } from "@/components/report-form/steps"

export default function SubmitReport() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(0)
  const [category, setCategory] = useState<string | null>(null)
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [location, setLocation] = useState("")
  const [date, setDate] = useState<Date | undefined>(undefined)
  const [files, setFiles] = useState<File[]>([])
  const [loading, setLoading] = useState(false)

  const handleNext = () => {
    if (currentStep < formSteps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  async function onSubmit() {
    if (!category || !title || !description || !location || !date) {
      toast.error("Please fill in all required fields")
      return
    }

    setLoading(true)

    try {
      console.log("Starting report submission...")
      // First, upload any files
      const uploadedFiles = []

      if (files.length > 0) {
        console.log(`Uploading ${files.length} files...`)
        for (const file of files) {
          const formData = new FormData()
          formData.append("file", file)

          console.log(`Uploading file: ${file.name}`)
          const uploadRes = await fetch("/api/upload", {
            method: "POST",
            body: formData,
          })

          if (!uploadRes.ok) {
            throw new Error(`Failed to upload file: ${file.name}. Status: ${uploadRes.status}`)
          }

          const uploadData = await uploadRes.json()
          if (!uploadData.success) {
            throw new Error(uploadData.error || `Failed to upload file: ${file.name}`)
          }

          uploadedFiles.push({
            name: file.name,
            url: uploadData.url,
            type: file.type,
          })
          console.log(`File uploaded successfully: ${file.name}`)
        }
      }

      // Submit the report
      const reportData = {
        category,
        title,
        description,
        location,
        dateOfIncident: date.toISOString().split("T")[0], // Format as YYYY-MM-DD
        attachments: uploadedFiles,
      }

      console.log("Submitting report data:", JSON.stringify(reportData, null, 2))
      const response = await fetch("/api/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reportData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || `Failed to submit report. Status: ${response.status}`)
      }

      if (!data.success) {
        throw new Error(data.error || "Failed to submit report")
      }

      console.log("Report submitted successfully. Tracking ID:", data.trackingId)
      toast.success(`Report submitted successfully! Your tracking ID is: ${data.trackingId}`)
      router.push(`/status?id=${data.trackingId}`)
    } catch (error) {
      console.error("Error submitting report:", error)
      toast.error(error instanceof Error ? error.message : "Failed to submit report. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
      <div className="container mx-auto py-10">
        <h1 className="text-3xl font-bold mb-6">Submit a Report</h1>
        <div className="max-w-2xl mx-auto">
          {currentStep === 0 && <CategoryStep selectedCategory={category} onSelectCategory={setCategory} />}
          {currentStep === 1 && (
              <DetailsStep
                  title={title}
                  setTitle={setTitle}
                  description={description}
                  setDescription={setDescription}
                  location={location}
                  setLocation={setLocation}
                  date={date}
                  setDate={setDate}
              />
          )}
          {currentStep === 2 && <EvidenceStep files={files} setFiles={setFiles} />}
          {currentStep === 3 && (
              <ReviewStep
                  category={category || ""}
                  title={title}
                  description={description}
                  location={location}
                  date={date}
                  files={files}
              />
          )}
          <div className="mt-6 flex justify-between">
            {currentStep > 0 && (
                <Button onClick={handlePrevious} variant="outline">
                  Previous
                </Button>
            )}
            {currentStep < formSteps.length - 1 ? (
                <Button onClick={handleNext} className="ml-auto">
                  Next
                </Button>
            ) : (
                <Button onClick={onSubmit} disabled={loading} className="ml-auto">
                  {loading ? "Submitting..." : "Submit Report"}
                </Button>
            )}
          </div>
        </div>
      </div>
  )
}

