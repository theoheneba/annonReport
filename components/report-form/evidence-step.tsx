"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Upload, X } from "lucide-react"
import { cn } from "@/lib/utils"

interface EvidenceStepProps {
  files: File[]
  setFiles: (files: File[]) => void
}

export function EvidenceStep({ files, setFiles }: EvidenceStepProps) {
  const [dragActive, setDragActive] = useState(false)

  function handleDrag(e: React.DragEvent) {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(Array.from(e.dataTransfer.files))
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault()
    if (e.target.files && e.target.files[0]) {
      handleFiles(Array.from(e.target.files))
    }
  }

  function handleFiles(newFiles: File[]) {
    const validFiles = newFiles.filter((file) => {
      const type = file.type.toLowerCase()
      return type.includes("pdf") || type.includes("image") || type.includes("video")
    })
    setFiles([...files, ...validFiles])
  }

  function removeFile(index: number) {
    const newFiles = [...files]
    newFiles.splice(index, 1)
    setFiles(newFiles)
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Upload Evidence</h2>

      <div
        className={cn(
          "border-2 border-dashed rounded-lg p-8 text-center",
          dragActive ? "border-primary" : "border-muted",
        )}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <Input
          id="evidence"
          type="file"
          className="hidden"
          onChange={handleChange}
          multiple
          accept=".pdf,image/*,video/*"
        />
        <Label htmlFor="evidence" className="flex flex-col items-center gap-2 cursor-pointer">
          <Upload className="h-8 w-8" />
          <span className="font-medium">Drop files here or click to upload</span>
          <span className="text-sm text-muted-foreground">Supports PDF, images, and videos</span>
        </Label>
      </div>

      {files.length > 0 && (
        <div className="space-y-2">
          <h3 className="font-medium">Uploaded Files</h3>
          <div className="space-y-2">
            {files.map((file, index) => (
              <div key={index} className="flex items-center justify-between p-2 border rounded">
                <span className="truncate max-w-[80%]">{file.name}</span>
                <Button variant="ghost" size="sm" onClick={() => removeFile(index)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

