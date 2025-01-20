import { cookies } from "next/headers"
import { AdminSidebar } from "@/components/admin/sidebar"
import { verifySession } from "@/lib/auth"

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const token = cookies().get("admin_session")?.value
  const isAuthenticated = token ? await verifySession(token) : null

  // If not authenticated and not on login page, only render the children (which should be the login page due to middleware)
  if (!isAuthenticated && children.type?.name === "AdminLogin") {
    return children
  }

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      {isAuthenticated && <AdminSidebar />}
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 dark:bg-gray-900">{children}</main>
      </div>
    </div>
  )
}

