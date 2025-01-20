"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { reportCategories } from "./steps"

interface CategoryStepProps {
  selectedCategory: string | null
  onSelectCategory: (category: string) => void
}

export function CategoryStep({ selectedCategory, onSelectCategory }: CategoryStepProps) {
  return (
    <div className="space-y-8 flex flex-col items-center">
      <h2 className="text-2xl font-semibold">Select Report Category</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 w-full max-w-3xl">
        {reportCategories.map((category) => {
          const Icon = category.icon
          return (
            <Button
              key={category.id}
              variant="outline"
              className={cn(
                "h-32 flex flex-col items-center justify-center gap-2 hover:bg-muted",
                selectedCategory === category.id && "bg-blue-50 border-blue-500 dark:bg-blue-950",
              )}
              onClick={() => onSelectCategory(category.id)}
            >
              <Icon className="h-8 w-8" />
              <span>{category.label}</span>
            </Button>
          )
        })}
      </div>
    </div>
  )
}

