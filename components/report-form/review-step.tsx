"use client"

import { format } from "date-fns"
import { reportCategories } from "./steps"

interface ReviewStepProps {
  category: string
  title: string
  description: string
  location: string
  date: Date | undefined
  files: File[]
}

export function ReviewStep({ category, title, description, location, date, files }: ReviewStepProps) {
  const selectedCategory = reportCategories.find((c) => c.id === category)

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Review Your Report</h2>

      <div className="space-y-4 rounded-lg border p-4">
        <div>
          <h3 className="font-medium">Category</h3>
          <p>{selectedCategory?.label}</p>
        </div>

        <div>
          <h3 className="font-medium">Title</h3>
          <p>{title}</p>
        </div>

        <div>
          <h3 className="font-medium">Description</h3>
          <p className="whitespace-pre-wrap">{description}</p>
        </div>

        <div>
          <h3 className="font-medium">Location</h3>
          <p>{location}</p>
        </div>

        <div>
          <h3 className="font-medium">Date of Incident</h3>
          <p>{date ? format(date, "PPP") : "Not specified"}</p>
        </div>

        {files.length > 0 && (
          <div>
            <h3 className="font-medium">Evidence Files</h3>
            <ul className="list-disc list-inside">
              {files.map((file, index) => (
                <li key={index}>{file.name}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}

