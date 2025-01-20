"use client"

import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

interface DetailsStepProps {
  title: string
  setTitle: (title: string) => void
  description: string
  setDescription: (description: string) => void
  location: string
  setLocation: (location: string) => void
  date: Date | undefined
  setDate: (date: Date | undefined) => void
}

export function DetailsStep({
  title,
  setTitle,
  description,
  setDescription,
  location,
  setLocation,
  date,
  setDate,
}: DetailsStepProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Report Details</h2>

      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Brief title for your report"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Provide detailed information about your concern..."
          className="min-h-[200px]"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="location">Location</Label>
        <Input
          id="location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Where did this occur?"
          required
        />
      </div>

      <div className="space-y-2">
        <Label>Date of Incident</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, "PPP") : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  )
}

