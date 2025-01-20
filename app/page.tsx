import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Lock, Shield, Clock, FileText, Eye, UserCheck } from "lucide-react"

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0D1117]">
      <section className="relative min-h-screen flex flex-col items-center justify-center text-white px-4">
        <Image
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Coat_of_arms_of_Ghana.svg/500px-Coat_of_arms_of_Ghana.svg.png"
          alt="Coat of arms of Ghana"
          width={120}
          height={120}
          className="mb-8"
        />
        <h1 className="text-5xl md:text-6xl font-bold text-center mb-4">Ghana Report</h1>
        <p className="text-xl md:text-2xl text-gray-300 text-center max-w-3xl mb-8">
          A secure platform for reporting workplace misconduct, fraud, and ethical concerns.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link href="/submit">
            <Button className="bg-[#F4D03F] hover:bg-[#F1C40F] text-black text-lg px-8 py-6">Submit a Report</Button>
          </Link>
          <Link href="/status">
            <Button variant="outline" className="text-white border-white hover:bg-white/10 text-lg px-8 py-6">
              Check Report Status
            </Button>
          </Link>
        </div>
      </section>

      <section className="py-20 bg-[#0D1117] text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Why Choose Our Platform?</h2>
            <p className="text-xl text-gray-300">
              We provide the tools and protection you need to report concerns safely.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-[#1C2128] p-8 rounded-lg">
              <Lock className="w-12 h-12 text-[#FCD116] mb-4" />
              <h3 className="text-xl font-semibold mb-2">Anonymous Reporting</h3>
              <p className="text-gray-400">
                Submit reports without revealing your identity. Your privacy is our top priority.
              </p>
            </div>

            <div className="bg-[#1C2128] p-8 rounded-lg">
              <Shield className="w-12 h-12 text-[#FCD116] mb-4" />
              <h3 className="text-xl font-semibold mb-2">Secure Platform</h3>
              <p className="text-gray-400">
                End-to-end encryption and secure data handling to protect sensitive information.
              </p>
            </div>

            <div className="bg-[#1C2128] p-8 rounded-lg">
              <Clock className="w-12 h-12 text-[#FCD116] mb-4" />
              <h3 className="text-xl font-semibold mb-2">Real-time Updates</h3>
              <p className="text-gray-400">Track the status of your report and receive updates on investigations.</p>
            </div>

            <div className="bg-[#1C2128] p-8 rounded-lg">
              <FileText className="w-12 h-12 text-[#FCD116] mb-4" />
              <h3 className="text-xl font-semibold mb-2">Evidence Upload</h3>
              <p className="text-gray-400">Securely upload supporting documents and evidence with your report.</p>
            </div>

            <div className="bg-[#1C2128] p-8 rounded-lg">
              <Eye className="w-12 h-12 text-[#FCD116] mb-4" />
              <h3 className="text-xl font-semibold mb-2">Transparent Process</h3>
              <p className="text-gray-400">Clear and documented handling procedures for all reported cases.</p>
            </div>

            <div className="bg-[#1C2128] p-8 rounded-lg">
              <UserCheck className="w-12 h-12 text-[#FCD116] mb-4" />
              <h3 className="text-xl font-semibold mb-2">Protected Identity</h3>
              <p className="text-gray-400">Advanced measures to ensure whistleblower protection and confidentiality.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#FCD116] py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">Ready to Make a Difference?</h2>
          <p className="text-xl text-gray-800 mb-8">
            Your report can help create a safer, more ethical workplace. Take the first step today.
          </p>
          <Link href="/submit">
            <Button className="bg-black hover:bg-gray-900 text-white px-8 py-6 text-lg">Submit a Report</Button>
          </Link>
        </div>
      </section>

      <footer className="bg-[#0D1117] text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">About</h3>
              <p className="text-gray-400">
                Ghana Report provides a secure platform for anonymous reporting of workplace misconduct and ethical
                concerns.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/submit" className="text-gray-400 hover:text-white">
                    Submit Report
                  </Link>
                </li>
                <li>
                  <Link href="/status" className="text-gray-400 hover:text-white">
                    Check Status
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="text-gray-400 hover:text-white">
                    Blog
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/privacy" className="text-gray-400 hover:text-white">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="text-gray-400 hover:text-white">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="/data-policy" className="text-gray-400 hover:text-white">
                    Data Policy
                  </Link>
                </li>
                <li>
                  <Link href="/consent" className="text-gray-400 hover:text-white">
                    User Consent
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <p className="text-gray-400">For general inquiries, please contact our support team.</p>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center">
            <p className="text-gray-400 mb-4">A secure platform for anonymous reporting and whistleblowing.</p>
            <p className="text-gray-500">© {new Date().getFullYear()} Ghana Report. All rights reserved.</p>
          </div>
        </div>
        <div className="h-1 w-full flex mt-8">
          <div className="flex-1 bg-[#CE1126]" />
          <div className="flex-1 bg-[#FCD116] relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-2 h-2 bg-black transform rotate-45" />
            </div>
          </div>
          <div className="flex-1 bg-[#006B3F]" />
        </div>
      </footer>
    </main>
  )
}

