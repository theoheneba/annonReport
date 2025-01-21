"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ModeToggle } from "@/components/mode-toggle"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-[#0D1117] border-b border-gray-800 relative">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex flex-col items-start gap-1 z-20">
          <div className="flex items-center gap-3">
            <Image
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Coat_of_arms_of_Ghana.svg/500px-Coat_of_arms_of_Ghana.svg.png"
              alt="Coat of arms of Ghana"
              width={32}
              height={32}
            />
            <div className="flex flex-col">
              <span className="text-white font-semibold">Ghana Report</span>
              <span className="text-sm text-gray-400 hidden sm:inline">Secure Anonymous Reporting</span>
            </div>
          </div>
          <div className="h-0.5 w-full flex">
            <div className="flex-1 bg-[#CE1126]" />
            <div className="flex-1 bg-[#FCD116]" />
            <div className="flex-1 bg-[#006B3F]" />
          </div>
        </Link>

        {/* Mobile menu button */}
        <button
          className="p-2 text-gray-400 hover:text-white md:hidden z-20"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center gap-6">
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

        {/* Mobile navigation */}
        {isMenuOpen && (
          <div className="absolute top-0 left-0 w-full h-screen bg-[#0D1117] z-10">
            <nav className="flex flex-col items-center gap-6 pt-24 px-4">
              <Link
                href="/blog"
                className="text-gray-300 hover:text-white transition-colors text-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                Blog
              </Link>
              <div className="py-2">
                <ModeToggle />
              </div>
              <Link
                href="/status"
                className="text-gray-300 hover:text-white transition-colors text-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                Check Status
              </Link>
              <Link href="/submit" onClick={() => setIsMenuOpen(false)}>
                <Button className="bg-[#FCD116] hover:bg-[#E5BE14] text-black font-medium w-full text-lg py-6">
                  Submit Report
                </Button>
              </Link>
              <Link
                href="/admin/login"
                className="text-gray-300 hover:text-white transition-colors text-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                Admin Login
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}

