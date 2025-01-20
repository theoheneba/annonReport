import Link from "next/link"
import { Home, FileText, Settings } from "lucide-react"

export function AdminSidebar() {
  return (
    <div className="bg-gray-800 text-white w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform -translate-x-full md:relative md:translate-x-0 transition duration-200 ease-in-out">
      <nav>
        <Link
          href="/admin"
          className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white"
        >
          <Home className="inline-block mr-2" size={20} />
          Dashboard
        </Link>
        <Link
          href="/admin/reports"
          className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white"
        >
          <FileText className="inline-block mr-2" size={20} />
          Reports
        </Link>
        <Link
          href="/admin/settings"
          className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white"
        >
          <Settings className="inline-block mr-2" size={20} />
          Settings
        </Link>
      </nav>
    </div>
  )
}

