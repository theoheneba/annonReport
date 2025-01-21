import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Lock, Shield, Clock, FileText, Eye, UserCheck } from "lucide-react"
import Script from "next/script"

export const metadata = {
  title: "Home",
  description:
    "Ghana Report - A secure platform for anonymous reporting of workplace misconduct, fraud, and ethical concerns.",
}

export default function Home() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Ghana Report",
    url: "https://www.ghanareport.com",
    description: "A secure platform for reporting workplace misconduct, fraud, and ethical concerns in Ghana.",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://www.ghanareport.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  }

  return (
    <>
      <Script
        id="structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <div className="min-h-screen bg-[#0D1117]">
        <section className="relative min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center px-4 py-16">
          <Image
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Coat_of_arms_of_Ghana.svg/500px-Coat_of_arms_of_Ghana.svg.png"
            alt="Coat of arms of Ghana"
            width={120}
            height={120}
            className="mb-8 w-24 h-24 sm:w-32 sm:h-32"
            priority
          />
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-center mb-4 text-white">Ghana Report</h1>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-300 text-center max-w-3xl mb-8 px-4">
            A secure platform for reporting workplace misconduct, fraud, and ethical concerns.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md px-4">
            <Link href="/submit" className="w-full">
              <Button className="bg-[#F4D03F] hover:bg-[#F1C40F] text-black w-full text-lg py-6">
                Submit a Report
              </Button>
            </Link>
            <Link href="/status" className="w-full">
              <Button variant="outline" className="text-white border-white hover:bg-white/10 w-full text-lg py-6">
                Check Status
              </Button>
            </Link>
          </div>
        </section>

        <section className="py-16 md:py-20 bg-[#0D1117] text-white">
          <div className="container px-4 mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-center">Why Choose Our Platform?</h2>
            <div className="relative my-4">
              <div className="h-1 w-full flex">
                <div className="flex-1 bg-[#CE1126]" />
                <div className="flex-1 bg-[#FCD116] relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-2 h-2 bg-black transform rotate-45" />
                  </div>
                </div>
                <div className="flex-1 bg-[#006B3F]" />
              </div>
            </div>
            <p className="text-lg sm:text-xl text-gray-300 text-center mb-12 px-4">
              We provide the tools and protection you need to report concerns safely.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto px-4">
              <div className="bg-[#1C2128] p-6 sm:p-8 rounded-lg">
                <Lock className="w-12 h-12 text-[#FCD116] mb-4" />
                <h3 className="text-xl font-semibold mb-2">Anonymous Reporting</h3>
                <p className="text-gray-400">
                  Submit reports without revealing your identity. Your privacy is our top priority.
                </p>
              </div>

              <div className="bg-[#1C2128] p-6 sm:p-8 rounded-lg">
                <Shield className="w-12 h-12 text-[#FCD116] mb-4" />
                <h3 className="text-xl font-semibold mb-2">Secure Platform</h3>
                <p className="text-gray-400">
                  End-to-end encryption and secure data handling to protect sensitive information.
                </p>
              </div>

              <div className="bg-[#1C2128] p-6 sm:p-8 rounded-lg">
                <Clock className="w-12 h-12 text-[#FCD116] mb-4" />
                <h3 className="text-xl font-semibold mb-2">Real-time Updates</h3>
                <p className="text-gray-400">Track the status of your report and receive updates on investigations.</p>
              </div>

              <div className="bg-[#1C2128] p-6 sm:p-8 rounded-lg">
                <FileText className="w-12 h-12 text-[#FCD116] mb-4" />
                <h3 className="text-xl font-semibold mb-2">Evidence Upload</h3>
                <p className="text-gray-400">Securely upload supporting documents and evidence with your report.</p>
              </div>

              <div className="bg-[#1C2128] p-6 sm:p-8 rounded-lg">
                <Eye className="w-12 h-12 text-[#FCD116] mb-4" />
                <h3 className="text-xl font-semibold mb-2">Transparent Process</h3>
                <p className="text-gray-400">Clear and documented handling procedures for all reported cases.</p>
              </div>

              <div className="bg-[#1C2128] p-6 sm:p-8 rounded-lg">
                <UserCheck className="w-12 h-12 text-[#FCD116] mb-4" />
                <h3 className="text-xl font-semibold mb-2">Protected Identity</h3>
                <p className="text-gray-400">
                  Advanced measures to ensure whistleblower protection and confidentiality.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#FCD116] py-16 md:py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">Ready to Make a Difference?</h2>
            <p className="text-xl text-gray-800 mb-8 px-4">
              Your report can help create a safer, more ethical workplace. Take the first step today.
            </p>
            <Link href="/submit">
              <Button className="bg-black hover:bg-gray-900 text-white px-8 py-6 text-lg w-full sm:w-auto">
                Submit a Report
              </Button>
            </Link>
          </div>
        </section>
      </div>
    </>
  )
}

