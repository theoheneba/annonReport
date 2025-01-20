"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useRouter } from "next/navigation"

export default function NewBlogPost() {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send a request to your API to create the blog post
    console.log("Creating new blog post:", { title, content })
    // After creating the post, redirect to the blog management page
    router.push("/admin/blog")
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Create New Blog Post</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="title">Title</Label>
          <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div>
          <Label htmlFor="content">Content</Label>
          <Textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            className="min-h-[200px]"
          />
        </div>
        <Button type="submit">Create Post</Button>
      </form>
    </div>
  )
}

