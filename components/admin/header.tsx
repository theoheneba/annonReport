"use client"

import { useRouter } from "next/navigation"
import { ModeToggle } from "@/components/mode-toggle"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { toast } from "sonner"

export function AdminHeader() {
  const router = useRouter()

  async function handleLogout() {
    const response = await fetch("/api/admin/logout", {
      method: "POST",
    })

    if (response.ok) {
      toast.success("Logged out successfully")
      router.push("/admin/login")
    }
  }

  return (
    <header className="bg-white shadow-sm z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Image
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Coat_of_arms_of_Ghana.svg/500px-Coat_of_arms_of_Ghana.svg.png"
                alt="Coat of arms of Ghana"
                width={40}
                height={40}
              />
              <span className="ml-2 text-xl font-semibold">Ghana Report Admin</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <ModeToggle />
            <Button variant="ghost" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </div>
      </div>
      <div className="h-1 bg-gradient-to-r from-red-600 via-yellow-400 to-green-600" />
    </header>
  )
}

