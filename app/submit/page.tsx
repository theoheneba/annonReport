"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { formSteps } from "@/components/report-form/steps"
import { CategoryStep } from "@/components/report-form/category-step"
import { DetailsStep } from "@/components/report-form/details-step"
import { EvidenceStep } from "@/components/report-form/evidence-step"
import { ReviewStep } from "@/components/report-form/review-step"
import { cn } from "@/lib/utils"

export default function SubmitReport() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(0)
  const [loading, setLoading] = useState(false)

  // Form state
  const [category, setCategory] = useState<string | null>(null)
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [location, setLocation] = useState("")
  const [date, setDate] = useState<Date>()
  const [files, setFiles] = useState<File[]>([])

  async function onSubmit() {
    if (!category || !title || !description || !location || !date) {
      toast.error("Please fill in all required fields")
      return
    }

    setLoading(true)

    try {
      // First, upload any files
      const uploadedFiles = []
      for (const file of files) {
        const formData = new FormData()
        formData.append("file", file)
        const uploadRes = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        })
        if (!uploadRes.ok) {
          throw new Error(`HTTP error! status: ${uploadRes.status}`)
        }
        const { url } = await uploadRes.json()
        uploadedFiles.push({
          name: file.name,
          url,
          type: file.type,
        })
      }

      // Then submit the report
      const response = await fetch("/api/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          category,
          title,
          description,
          location,
          dateOfIncident: date.toISOString(),
          attachments: uploadedFiles,
        }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()

      if (data.success) {
        toast.success(`Report submitted successfully! Your tracking ID is: ${data.trackingId}`)
        router.push(`/status?id=${data.trackingId}`)
      } else {
        throw new Error(data.error || "Failed to submit report")
      }
    } catch (error) {
      console.error("Error submitting report:", error)
      toast.error("Failed to submit report. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  function nextStep() {
    if (currentStep === 0 && !category) {
      toast.error("Please select a category")
      return
    }
    if (currentStep === 1 && (!title || !description || !location || !date)) {
      toast.error("Please fill in all required fields")
      return
    }
    if (currentStep < formSteps.length - 1) {
      setCurrentStep((step) => step + 1)
    }
  }

  function prevStep() {
    if (currentStep > 0) {
      setCurrentStep((step) => step - 1)
    }
  }

  return (
    <main className="container max-w-4xl py-10">
      <div className="mb-8">
        <div className="flex justify-between items-center">
          {formSteps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center border-2",
                  currentStep === index
                    ? "border-primary bg-primary text-primary-foreground"
                    : currentStep > index
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-muted bg-background",
                )}
              >
                {currentStep > index ? "✓" : index + 1}
              </div>
              <span
                className={cn("ml-2", currentStep === index ? "text-primary font-medium" : "text-muted-foreground")}
              >
                {step.label}
              </span>
              {index < formSteps.length - 1 && (
                <div className={cn("h-0.5 w-12 mx-2", currentStep > index ? "bg-primary" : "bg-muted")} />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="border rounded-lg p-6 bg-card">
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
            category={category!}
            title={title}
            description={description}
            location={location}
            date={date}
            files={files}
          />
        )}

        <div className="mt-6 flex justify-between">
          <Button variant="outline" onClick={prevStep} disabled={currentStep === 0}>
            Back
          </Button>

          {currentStep === formSteps.length - 1 ? (
            <Button onClick={onSubmit} disabled={loading}>
              {loading ? "Submitting..." : "Submit Report"}
            </Button>
          ) : (
            <Button onClick={nextStep}>Next Step</Button>
          )}
        </div>
      </div>
    </main>
  )
}

