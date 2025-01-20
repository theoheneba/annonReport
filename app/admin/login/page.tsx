"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import { Mail, Lock } from "lucide-react"
import { toast } from "sonner"

export default function AdminLogin() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setLoading(true)

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: formData.email,
          password: formData.password,
        }),
      })

      const data = await response.json()

      if (response.ok && data.success) {
        toast.success("Logged in successfully")
        router.push("/admin")
        router.refresh()
      } else {
        throw new Error(data.error || "Invalid credentials")
      }
    } catch (error) {
      console.error("Login error:", error)
      toast.error(error instanceof Error ? error.message : "Failed to login")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0D1117]">
      <div className="w-full max-w-md p-8 rounded-lg bg-[#1C2128] border border-gray-700">
        <div className="flex flex-col items-center mb-8">
          <Image
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Coat_of_arms_of_Ghana.svg/500px-Coat_of_arms_of_Ghana.svg.png"
            alt="Ghana Coat of Arms"
            width={64}
            height={64}
            className="mb-6"
          />
          <h1 className="text-2xl font-semibold text-white mb-2">Welcome Back</h1>
          <p className="text-gray-400">Sign in to access the dashboard</p>
        </div>

        <form onSubmit={onSubmit} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm text-gray-400">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                placeholder="admin@ghanareport.gov.gh"
                required
                className="pl-10 bg-[#2D333B] border-gray-700 text-white placeholder:text-gray-500 focus-visible:ring-[#FCD116] focus-visible:ring-offset-0"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="text-sm text-gray-400">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => setFormData((prev) => ({ ...prev, password: e.target.value }))}
                placeholder="••••••••••"
                required
                className="pl-10 bg-[#2D333B] border-gray-700 text-white placeholder:text-gray-500 focus-visible:ring-[#FCD116] focus-visible:ring-offset-0"
              />
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-[#FCD116] hover:bg-[#E5BE14] text-black font-medium h-11"
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign in"}
          </Button>
        </form>
      </div>
    </div>
  )
}

