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

    console.log("Submitting report data:", reportData)
    const response = await fetch("/api/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reportData),
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error || `Failed to submit report. Status: ${response.status}`)
    }

    const data = await response.json()

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

