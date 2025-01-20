import Link from "next/link"
import Image from "next/image"
import { ModeToggle } from "@/components/mode-toggle"
import { Button } from "@/components/ui/button"

export function Header() {
  return (
    <header className="bg-[#0D1117] border-b border-gray-800">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex flex-col items-start gap-1">
          <div className="flex items-center gap-3">
            <Image
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Coat_of_arms_of_Ghana.svg/500px-Coat_of_arms_of_Ghana.svg.png"
              alt="Coat of arms of Ghana"
              width={32}
              height={32}
            />
            <div className="flex flex-col">
              <span className="text-white font-semibold">Ghana Report</span>
              <span className="text-sm text-gray-400">Secure Anonymous Reporting</span>
            </div>
          </div>
          <div className="h-0.5 w-full flex">
            <div className="flex-1 bg-[#CE1126]" />
            <div className="flex-1 bg-[#FCD116]" />
            <div className="flex-1 bg-[#006B3F]" />
          </div>
        </Link>
        <nav className="flex items-center gap-6">
          <Link href="/blog" className="text-gray-300 hover:text-white transition-colors">
            Blog
          </Link>
          <ModeToggle />
          <Link href="/status" className="text-gray-300 hover:text-white transition-colors">
            Check Status
          </Link>
          <Link href="/submit">
            <Button className="bg-[#FCD116] hover:bg-[#E5BE14] text-black font-medium">Submit Report</Button>
          </Link>
          <Link href="/admin/login" className="text-gray-300 hover:text-white transition-colors">
            Admin Login
          </Link>
        </nav>
      </div>
    </header>
  )
}

