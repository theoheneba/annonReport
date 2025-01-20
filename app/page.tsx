import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"

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
        <div className="absolute bottom-0 left-0 right-0">
          <div className="h-2 w-full flex">
            <div className="flex-1 bg-[#CE1126]" />
            <div className="flex-1 bg-[#FCD116] relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-2 h-2 bg-black transform rotate-45" />
              </div>
            </div>
            <div className="flex-1 bg-[#006B3F]" />
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#0D1117] text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-4">Why Choose Our Platform?</h2>
          <p className="text-xl text-gray-300 text-center max-w-3xl mx-auto">
            We provide the tools and protection you need to report concerns safely.
          </p>
        </div>
      </section>
    </main>
  )
}

