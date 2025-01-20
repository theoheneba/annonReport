"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Home, FileText, Users, Settings, BarChart2, Bell, BookOpen, LogOut } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

const navItems = [
  { icon: Home, label: "Dashboard", href: "/admin" },
  { icon: FileText, label: "Reports", href: "/admin/reports" },
  { icon: Users, label: "Users", href: "/admin/users" },
  { icon: BarChart2, label: "Analytics", href: "/admin/analytics" },
  { icon: Bell, label: "Notifications", href: "/admin/notifications" },
  { icon: BookOpen, label: "Blog", href: "/admin/blog" },
  { icon: Settings, label: "Settings", href: "/admin/settings" },
]

export function AdminSidebar() {
  const pathname = usePathname()
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
    <div className="bg-white dark:bg-gray-800 text-gray-800 dark:text-white w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform -translate-x-full md:relative md:translate-x-0 transition duration-200 ease-in-out">
      <nav className="space-y-2">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center space-x-2 px-4 py-3 rounded transition duration-200",
              pathname === item.href
                ? "bg-gray-200 dark:bg-gray-700 text-blue-600 dark:text-blue-400"
                : "hover:bg-gray-100 dark:hover:bg-gray-700",
            )}
          >
            <item.icon className="h-5 w-5" />
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>
      <div className="px-4 mt-auto">
        <Button variant="ghost" className="w-full justify-start" onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </div>
    </div>
  )
}

