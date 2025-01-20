import Link from "next/link"
import { ModeToggle } from "@/components/mode-toggle"
import { Button } from "@/components/ui/button"

export function Header() {
  return (
    <header className="absolute top-0 left-0 right-0 z-10">
      <div className="container flex h-16 items-center justify-between text-white">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-sm text-gray-300">Secure Anonymous Reporting</span>
        </Link>
        <nav className="flex items-center space-x-4">
          <Link href="/blog" className="text-gray-300 hover:text-white">
            Blog
          </Link>
          <ModeToggle />
          <Link href="/status" className="text-gray-300 hover:text-white">
            Check Status
          </Link>
          <Link href="/submit">
            <Button className="bg-[#F4D03F] hover:bg-[#F1C40F] text-black">Submit Report</Button>
          </Link>
        </nav>
      </div>
    </header>
  )
}

